import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  fileSink,
  LOG_MAX_BYTES,
  pageSink,
  redirectConsoleToSink,
  SUPERVISOR_CONSOLE_SOURCE,
  seatPageSink,
  shouldRotate,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-console/supervisor-console.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a log at or past its ceiling rotates and one under it does not", () => {
  expect(shouldRotate(LOG_MAX_BYTES, LOG_MAX_BYTES)).toBe(true)
  expect(shouldRotate(LOG_MAX_BYTES - 1, LOG_MAX_BYTES)).toBe(false)
  expect(shouldRotate(1_000, 0)).toBe(false)
})

test("a sink writes the level and the text into its file", () => {
  const path = join(scratch.rootFor("supervisor-console-"), "supervisor.log")
  fileSink(path)("LOG", "a line")
  expect(readFileSync(path, "utf8")).toContain("[LOG] a line")
})

test("a file at its ceiling is renamed aside rather than grown", () => {
  const dir = scratch.rootFor("supervisor-console-")
  const path = join(dir, "supervisor.log")
  writeFileSync(path, "x".repeat(100))
  const sink = fileSink(path, { maxBytes: 10 })
  sink("LOG", "fresh")
  expect(readFileSync(`${path}.1`, "utf8")).toBe("x".repeat(100))
  expect(readFileSync(path, "utf8")).toContain("fresh")
})

test("a line the page refuses lands in the fallback rather than being lost", () => {
  const fell: string[] = []
  let refusal: string | null = "the page is full"
  const writer = { write: () => undefined, refused: () => refusal }
  const sink = pageSink(SUPERVISOR_CONSOLE_SOURCE, writer as never, "a", (level, text) => {
    fell.push(`${level} ${text}`)
  })
  sink("LOG", "one")
  expect(fell).toHaveLength(2)
  expect(fell[0]).toContain(SUPERVISOR_CONSOLE_SOURCE)
  expect(fell[1]).toBe("LOG one")
  sink("LOG", "two")
  expect(fell).toHaveLength(3)
  refusal = null
  sink("LOG", "three")
  expect(fell).toHaveLength(3)
})

test("a page that refuses nothing sends nothing to the fallback", () => {
  const fell: string[] = []
  const writer = { write: () => undefined, refused: () => null }
  pageSink(SUPERVISOR_CONSOLE_SOURCE, writer as never, "a", (level, text) => {
    fell.push(`${level} ${text}`)
  })("LOG", "one")
  expect(fell).toHaveLength(0)
})

function writerTaking(taken: string[]): unknown {
  return { write: (row: { text: string }) => taken.push(row.text), refused: () => null }
}

test("a sink whose seat cannot be named yet writes to the file and joins the page once it can", () => {
  const fell: string[] = []
  const taken: string[] = []
  let seat: string | null = null
  const seams = { seatFor: () => seat, writerFor: () => writerTaking(taken) }
  const sink = seatPageSink(
    SUPERVISOR_CONSOLE_SOURCE,
    "a",
    (level, text) => {
      fell.push(`${level} ${text}`)
    },
    seams as never
  )

  sink("LOG", "before")
  expect(fell).toEqual(["LOG before"])
  expect(taken).toEqual([])
  seat = "thea"
  sink("LOG", "after")
  expect(taken).toEqual(["after"])
  expect(fell).toEqual(["LOG before"])
})

test("a sink whose seat cannot be looked for at all writes to the file and joins the page later", () => {
  const fell: string[] = []
  const taken: string[] = []
  let throwing = true
  const seams = {
    seatFor: (): string => {
      if (throwing) throw new Error("the index is part way through a refresh")
      return "thea"
    },
    writerFor: () => writerTaking(taken),
  }
  const sink = seatPageSink(
    SUPERVISOR_CONSOLE_SOURCE,
    "a",
    (level, text) => {
      fell.push(`${level} ${text}`)
    },
    seams as never
  )

  expect(() => sink("LOG", "before")).not.toThrow()
  expect(fell).toEqual(["LOG before"])
  expect(taken).toEqual([])
  throwing = false
  sink("LOG", "after")
  expect(taken).toEqual(["after"])
})

test("the seat a sink found once is not looked for again", () => {
  let asked = 0
  const taken: string[] = []
  const seams = {
    seatFor: (): string => {
      asked += 1
      return "thea"
    },
    writerFor: () => writerTaking(taken),
  }
  const sink = seatPageSink(SUPERVISOR_CONSOLE_SOURCE, "a", () => undefined, seams as never)

  sink("LOG", "one")
  sink("LOG", "two")
  expect(asked).toBe(1)
  expect(taken).toEqual(["one", "two"])
})

test("a sink whose writer cannot be made at all writes to the file and joins the page later", () => {
  const fell: string[] = []
  const taken: string[] = []
  let throwing = true
  const seams = {
    seatFor: () => "thea",
    writerFor: (): unknown => {
      if (throwing) throw new Error("the index is part way through a refresh")
      return writerTaking(taken)
    },
  }
  const sink = seatPageSink(
    SUPERVISOR_CONSOLE_SOURCE,
    "a",
    (level, text) => {
      fell.push(`${level} ${text}`)
    },
    seams as never
  )

  expect(() => sink("LOG", "before")).not.toThrow()
  expect(fell).toEqual(["LOG before"])
  expect(taken).toEqual([])
  throwing = false
  sink("LOG", "after")
  expect(taken).toEqual(["after"])
})

test("a writer that throws sends the line to the fallback rather than out of the sink", () => {
  const fell: string[] = []
  const writer = {
    write: () => {
      throw new Error("the index is part way through a refresh")
    },
    refused: () => null,
  }
  const sink = pageSink(SUPERVISOR_CONSOLE_SOURCE, writer as never, "a", (level, text) => {
    fell.push(`${level} ${text}`)
  })

  expect(() => sink("LOG", "one")).not.toThrow()
  expect(fell).toEqual(["LOG one"])
})

test("a fallback that throws sends the line to standard error rather than out of the sink", () => {
  const written: string[] = []
  const before = process.stderr.write
  process.stderr.write = ((chunk: string) => {
    written.push(chunk)
    return true
  }) as typeof process.stderr.write
  const writer = { write: () => undefined, refused: () => "the page is full" }
  const sink = pageSink(SUPERVISOR_CONSOLE_SOURCE, writer as never, "a", () => {
    throw new Error("the file is gone")
  })

  expect(() => sink("LOG", "one")).not.toThrow()
  process.stderr.write = before
  expect(written).toHaveLength(2)
  expect(written[1]).toContain("[LOG] one")
})

test("a file that will not take a line writes that line to standard error", () => {
  const written: string[] = []
  const before = process.stderr.write
  process.stderr.write = ((chunk: string) => {
    written.push(chunk)
    return true
  }) as typeof process.stderr.write
  const sink = fileSink(join(scratch.rootFor("supervisor-console-"), "no-such-dir/supervisor.log"))

  expect(() => sink("LOG", "a line")).not.toThrow()
  process.stderr.write = before
  expect(written).toHaveLength(1)
  expect(written[0]).toContain("[LOG] a line")
})

test("a console this installs never throws, whatever the sink beneath it does", () => {
  const written: string[] = []
  const before = process.stderr.write
  process.stderr.write = ((chunk: string) => {
    written.push(chunk)
    return true
  }) as typeof process.stderr.write
  const restore = redirectConsoleToSink(() => {
    throw new Error("the index is part way through a refresh")
  })

  expect(() => console.log("said")).not.toThrow()
  expect(() => console.warn("said")).not.toThrow()
  expect(() => console.error("said")).not.toThrow()
  restore()
  process.stderr.write = before
  expect(written).toHaveLength(3)
  expect(written[0]).toContain("[LOG] said")
  expect(written[1]).toContain("[WARN] said")
  expect(written[2]).toContain("[ERROR] said")
})

test("a line standard error throws over is dropped rather than thrown on", () => {
  const before = process.stderr.write
  process.stderr.write = (() => {
    throw new Error("standard error refuses this line")
  }) as typeof process.stderr.write
  const restore = redirectConsoleToSink(() => {
    throw new Error("the index is part way through a refresh")
  })

  expect(() => console.log("said")).not.toThrow()
  restore()
  process.stderr.write = before
})

test("a redirected console is put back as it was", () => {
  const seen: string[] = []
  const before = console.log
  const restore = redirectConsoleToSink((level, text) => {
    seen.push(`${level} ${text}`)
  })
  console.log("said", 1)
  console.error(new Error("thrown"))
  restore()
  expect(console.log).toBe(before)
  expect(seen[0]).toBe("LOG said 1")
  expect(seen[1]).toContain("ERROR thrown")
})
