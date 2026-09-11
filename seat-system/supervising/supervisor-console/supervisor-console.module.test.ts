import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  fileSink,
  LOG_MAX_BYTES,
  pageSink,
  redirectConsoleToSink,
  SUPERVISOR_CONSOLE_SOURCE,
  seatPageSink,
  shouldRotate,
} from "akasha/seat-system/supervising/supervisor-console/supervisor-console.module.code.ts"

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
