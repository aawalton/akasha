import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Answer, Given } from "../../calling.module.code.ts"
import { blobIdOf, readingIn } from "../../reading.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import { ANSWER_CEILING, costOf, readWith, surface } from "./read.command.code.ts"

const CALLED_AS = "akasha read"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootWith(
  named: readonly { readonly at: string; readonly body: string | Uint8Array }[]
): string {
  const root = scratch.rootFor("akasha-read-")
  for (const one of named) {
    const at = join(root, one.at)
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    writeFileSync(at, one.body)
  }
  return root
}

function givenAt(root: string) {
  return { root, calledAs: CALLED_AS, from: root, writer: null, agentId: null }
}

const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

function givenFor(root: string) {
  return { root, calledAs: CALLED_AS, from: root, writer: null, agentId: AGENT }
}

function bodyOf(said: string): Uint8Array {
  return new TextEncoder().encode(said)
}

function read(argv: readonly string[], given: Given): Answer {
  return readWith(argv, given, null)
}

test("a file inside akasha comes back whole and line-numbered", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\ntwo\nthree\n" }])
  const said = read(["--file-path", "akasha/one/held.ts"], givenAt(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha/one/held.ts — the whole file follows, 3 lines")
  expect(said.report[1]).toBe("     1\tone\n     2\ttwo\n     3\tthree")
})

test("naming no file is a caller mistake and nothing is read", () => {
  const root = rootWith([])
  const said = read([], givenAt(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--file-path names a file to read")
})

test("a path outside akasha is refused rather than read", () => {
  const root = rootWith([
    { at: "akasha/one/held.ts", body: "one\n" },
    { at: "agent/elsewhere.ts", body: "two\n" },
  ])
  const said = read(["--file-path", "agent/elsewhere.ts"], givenAt(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("stands outside `akasha/`")
})

test("an absolute path inside akasha is read, and one outside it is not", () => {
  const root = rootWith([
    { at: "akasha/one/held.ts", body: "one\n" },
    { at: "agent/elsewhere.ts", body: "two\n" },
  ])
  const inside = read(["--file-path", join(root, "akasha/one/held.ts")], givenAt(root))
  expect(inside.code).toBe(0)
  const outside = read(["--file-path", join(root, "agent/elsewhere.ts")], givenAt(root))
  expect(outside.code).toBe(1)
})

test("a relative path is taken against the directory the call was made in", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(["--file-path", "held.ts"], {
    ...givenAt(root),
    from: join(root, "akasha/one"),
  })
  expect(said.code).toBe(0)
  expect(said.report[0]).toContain("held.ts — the whole file follows, 1 lines")
})

test("a file that is not there is a caller mistake, and the rest are still read", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(
    ["--file-path", "akasha/one/gone.ts", "--file-path", "akasha/one/held.ts"],
    givenAt(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no file")
  expect(said.report[0]).toContain("akasha/one/held.ts")
})

test("naming one file twice is refused before anything is read", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(
    ["--file-path", "akasha/one/held.ts", "--file-path", "akasha/one/held.ts"],
    givenAt(root)
  )
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("named more than once")
})

test("a body that is not UTF-8 text says what it is instead of the body", () => {
  const root = rootWith([
    { at: "akasha/one/held.bin", body: new Uint8Array([0xff, 0xfe, 0x00, 0x41]) },
  ])
  const said = read(["--file-path", "akasha/one/held.bin"], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  expect(said.report[0]).toContain("4 bytes that are not UTF-8 text, beginning `fffe0041`")
})

test("a body past what one answer holds is refused rather than cut", () => {
  const root = rootWith([{ at: "akasha/one/long.ts", body: `${"x".repeat(ANSWER_CEILING + 1)}\n` }])
  const said = read(["--file-path", "akasha/one/long.ts"], givenAt(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain(`past the ${ANSWER_CEILING} one answer holds`)
})

test("--full and --seat are refused with what they would have meant", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const full = read(["--full", "--file-path", "akasha/one/held.ts"], givenAt(root))
  expect(full.code).toBe(1)
  expect(full.refusals[0]).toContain("comes back whole already")
  const seat = read(["--seat"], givenAt(root))
  expect(seat.code).toBe(1)
  expect(seat.refusals[0]).toContain("what a seat is bound to")
})

test("an argument this does not take is a caller mistake", () => {
  const root = rootWith([])
  const said = read(["--offset", "20"], givenAt(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not an argument this takes")
})

const MANY = 12

const EACH = 40

function manyFiles(): readonly { readonly at: string; readonly body: string }[] {
  const made: { readonly at: string; readonly body: string }[] = []
  for (let one = 0; one < MANY; one += 1) {
    const line = `${"x".repeat(70)}\n`
    made.push({ at: `akasha/many/file-${one}.ts`, body: line.repeat(EACH) })
  }
  return made
}

function namingAll(): readonly string[] {
  const said: string[] = []
  for (let one = 0; one < MANY; one += 1) said.push("--file-path", `akasha/many/file-${one}.ts`)
  return said
}

test("more than one answer holds comes back as fewer files and a call for the rest", () => {
  const root = rootWith(manyFiles())
  const said = read(namingAll(), givenAt(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  const call = said.report[said.report.length - 1] ?? ""
  expect(call.startsWith(`${CALLED_AS} --file-path `)).toBe(true)
  const left = call.split(" --file-path ").slice(1)
  expect(left.length).toBeGreaterThan(0)
  const returned = said.report.filter((one) => one.includes("the whole file follows"))
  expect(returned.length).toBeGreaterThan(0)
  expect(returned.length + left.length).toBe(MANY)
  for (const one of left) {
    expect(returned.some((two) => two.startsWith(`${one} —`))).toBe(false)
  }
})

test("the answer holding a call for the rest is itself under the ceiling", () => {
  const root = rootWith(manyFiles())
  const said = read(namingAll(), givenAt(root))
  expect(costOf(said.report)).toBeLessThanOrEqual(ANSWER_CEILING)
})

test("the call for the rest reads exactly what was left, and then the set is done", () => {
  const root = rootWith(manyFiles())
  const first = read(namingAll(), givenAt(root))
  const call = first.report[first.report.length - 1] ?? ""
  const left = call.split(" --file-path ").slice(1)
  const again: string[] = []
  for (const one of left) again.push("--file-path", one)
  const second = read(again, givenAt(root))
  expect(second.code).toBe(0)
  const returned = second.report.filter((one) => one.includes("the whole file follows"))
  expect(returned.length).toBe(left.length)
  expect(costOf(second.report)).toBeLessThanOrEqual(ANSWER_CEILING)
})

test("every argument the surface shows is an argument this takes", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  for (const one of surface.taking) {
    const said = read([one.said.split(" ")[0] ?? ""], givenAt(root))
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})

test("a read records the body that reached the agent", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\ntwo\n" }])
  const said = read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(said.code).toBe(0)
  const held = readingIn(root, AGENT, "akasha/one/held.ts")
  expect(held?.oid).toBe(blobIdOf(bodyOf("one\ntwo\n")))
  expect(held?.seenAt).toBeGreaterThan(0)
})

test("a read for an agent nothing identifies returns the body and records nothing", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(["--file-path", "akasha/one/held.ts"], givenAt(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("the whole file follows")
  expect(said.report.join("\n")).toContain("names no agent")
  expect(readingIn(root, AGENT, "akasha/one/held.ts")).toBeNull()
})

test("a read whose output is thrown away returns nothing and records nothing", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = readWith(["--file-path", "akasha/one/held.ts"], givenFor(root), "a pipe")
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("a pipe")
  expect(readingIn(root, AGENT, "akasha/one/held.ts")).toBeNull()
})

test("a body that is not text reaches nobody, so nothing is recorded", () => {
  const root = rootWith([{ at: "akasha/one/held.bin", body: new Uint8Array([0xff, 0xfe, 0x00]) }])
  const said = read(["--file-path", "akasha/one/held.bin"], givenFor(root))
  expect(said.code).toBe(0)
  expect(readingIn(root, AGENT, "akasha/one/held.bin")).toBeNull()
})

test("an empty body reached the agent whole, so it is recorded", () => {
  const root = rootWith([{ at: "akasha/one/bare.ts", body: "" }])
  read(["--file-path", "akasha/one/bare.ts"], givenFor(root))
  expect(readingIn(root, AGENT, "akasha/one/bare.ts")?.oid).toBe(blobIdOf(bodyOf("")))
})

test("a second read records the body the file holds now", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "before\n" }])
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  writeFileSync(join(root, "akasha/one/held.ts"), "after\n")
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(readingIn(root, AGENT, "akasha/one/held.ts")?.oid).toBe(blobIdOf(bodyOf("after\n")))
})

test("one agent's read is not another agent's", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(readingIn(root, "another-agent", "akasha/one/held.ts")).toBeNull()
})
