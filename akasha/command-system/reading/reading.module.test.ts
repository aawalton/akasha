import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, type Stats, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  agentIdsIn,
  blobIdOf,
  carriedInto,
  carryReadings,
  discardedBy,
  READS_AT,
  readingFileAt,
  readingIn,
  recordRead,
  sameBody,
} from "./reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

const OTHER = "01a04e96-c80a-79ef-819f-000000000000"

const A = "akasha/a.ts"

const B = "akasha/b.ts"

function bodyStanding(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}

function thinAt(root: string, path: string, said: Record<string, unknown>): void {
  const at = readingFileAt(root, AGENT, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(said)}\n`)
}

function statLike(said: Record<string, unknown>): Stats {
  return {
    isFIFO: () => false,
    isFile: () => true,
    ...said,
  } as unknown as Stats
}

const NOWHERE = statLike({ dev: 1, ino: 1, isFile: () => false })

const ELSEWHERE = statLike({ dev: 9, ino: 9 })

test("a blob id is git's own over the bytes", () => {
  const said = blobIdOf(new TextEncoder().encode("hello world\n"))
  expect(said).toBe("3b18e512dba79e4c8300dd08aeb37f8e728b8dad")
})

test("an empty body still has an id", () => {
  expect(blobIdOf(new Uint8Array())).toBe("e69de29bb2d1d6434b8b29ae775ad8c2e48c5391")
})

test("a reading is found by agent, then by path", () => {
  const at = readingFileAt("/r", AGENT, "akasha/x/y.ts")
  expect(at).toBe(join("/r", READS_AT, "agent", "id", AGENT, "path", "akasha/x/y.ts.jsonl"))
})

test("a reading recorded is the reading read back", () => {
  const root = scratch.rootFor("akasha-reading-")
  const held = { path: "akasha/a.ts", oid: "abc123", seenAt: 1788000000000, mechanicalOid: null }
  recordRead(root, AGENT, held)
  expect(readingIn(root, AGENT, "akasha/a.ts")).toEqual(held)
})

test("a reading of a path replaces the one before it", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: "akasha/a.ts", oid: "one", seenAt: 1, mechanicalOid: null })
  recordRead(root, AGENT, { path: "akasha/a.ts", oid: "two", seenAt: 2, mechanicalOid: null })
  expect(readingIn(root, AGENT, "akasha/a.ts")?.oid).toBe("two")
})

test("one agent's reading is not another's", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: "akasha/a.ts", oid: "one", seenAt: 1, mechanicalOid: null })
  expect(readingIn(root, "another-agent", "akasha/a.ts")).toBeNull()
})

test("a path never read reads as nothing", () => {
  const root = scratch.rootFor("akasha-reading-")
  expect(readingIn(root, AGENT, "akasha/never.ts")).toBeNull()
})

test("a line that will not parse reads as nothing", () => {
  const root = scratch.rootFor("akasha-reading-")
  const at = readingFileAt(root, AGENT, "akasha/bad.ts")
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, "{ not json\n")
  expect(readingIn(root, AGENT, "akasha/bad.ts")).toBeNull()
})

test("a line missing what a reading carries reads as nothing", () => {
  const root = scratch.rootFor("akasha-reading-")
  const at = readingFileAt(root, AGENT, "akasha/thin.ts")
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify({ path: "akasha/thin.ts", oid: "abc" })}\n`)
  expect(readingIn(root, AGENT, "akasha/thin.ts")).toBeNull()
})

test("a line saying nothing of a mechanical change left none behind", () => {
  const root = scratch.rootFor("akasha-reading-")
  thinAt(root, A, { path: A, oid: "abc", seenAt: 1 })
  expect(readingIn(root, AGENT, A)).toEqual({ path: A, oid: "abc", seenAt: 1, mechanicalOid: null })
})

test("a mechanical id said as nothing at all is read as none", () => {
  const root = scratch.rootFor("akasha-reading-")
  thinAt(root, A, { path: A, oid: "abc", seenAt: 1, mechanicalOid: "" })
  expect(readingIn(root, AGENT, A)?.mechanicalOid).toBeNull()
})

test("the body read and the body a mechanical change left both answer, and no third", () => {
  const held = { path: A, oid: "one", seenAt: 1, mechanicalOid: "two" }
  expect(sameBody(held, "one")).toBe(true)
  expect(sameBody(held, "two")).toBe(true)
  expect(sameBody(held, "three")).toBe(false)
  expect(sameBody(null, "one")).toBe(false)
})

test("a reading of another body than the change started from is not carried", () => {
  const held = { path: A, oid: "one", seenAt: 1, mechanicalOid: null }
  expect(carriedInto(held, { was: A, now: B, from: "two" }, "three")).toBeNull()
})

test("a carry chains off the mechanical id, and the body read stays pinned", () => {
  const held = { path: A, oid: "one", seenAt: 1, mechanicalOid: "two" }
  expect(carriedInto(held, { was: A, now: B, from: "two" }, "three")).toEqual({
    path: B,
    oid: "one",
    seenAt: 1,
    mechanicalOid: "three",
  })
  expect(carriedInto(held, { was: A, now: B, from: "one" }, "three")).toBeNull()
})

test("a carried reading stands at the new path and the old file is gone", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = bodyStanding(root, A, "one\n")
  const now = bodyStanding(root, B, "two\n")
  recordRead(root, AGENT, { path: A, oid: was, seenAt: 1, mechanicalOid: null })
  carryReadings(root, [{ was: A, now: B, from: was }])
  expect(readingIn(root, AGENT, B)).toEqual({
    path: B,
    oid: was,
    seenAt: 1,
    mechanicalOid: now,
  })
  expect(readingIn(root, AGENT, A)).toBeNull()
  expect(existsSync(readingFileAt(root, AGENT, A))).toBe(false)
})

test("a body rewritten where it stands keeps its path and gains the mechanical id", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const now = bodyStanding(root, A, "two\n")
  recordRead(root, AGENT, { path: A, oid: was, seenAt: 1, mechanicalOid: null })
  carryReadings(root, [{ was: A, now: A, from: was }])
  expect(readingIn(root, AGENT, A)).toEqual({ path: A, oid: was, seenAt: 1, mechanicalOid: now })
  expect(existsSync(readingFileAt(root, AGENT, A))).toBe(true)
})

test("every agent holding the body is carried, not the first one found", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = bodyStanding(root, A, "one\n")
  const now = bodyStanding(root, B, "two\n")
  for (const one of [AGENT, OTHER]) {
    recordRead(root, one, { path: A, oid: was, seenAt: 1, mechanicalOid: null })
  }
  expect(agentIdsIn(root)).toEqual([OTHER, AGENT])
  carryReadings(root, [{ was: A, now: B, from: was }])
  for (const one of [AGENT, OTHER]) {
    expect(readingIn(root, one, B)?.mechanicalOid).toBe(now)
    expect(readingIn(root, one, A)).toBeNull()
  }
})

test("output at /dev/null is thrown away", () => {
  expect(discardedBy(statLike({ dev: 1, ino: 1 }), ELSEWHERE, NOWHERE)).toBe("/dev/null")
})

test("output down a pipe is thrown away", () => {
  const out = statLike({
    dev: 2,
    ino: 2,
    isFIFO: () => true,
    isFile: () => false,
  })
  expect(discardedBy(out, ELSEWHERE, NOWHERE)).toBe("a pipe")
})

test("output and errors in one file is the harness, not a redirect", () => {
  const out = statLike({ dev: 3, ino: 3 })
  expect(discardedBy(out, statLike({ dev: 3, ino: 3 }), NOWHERE)).toBeNull()
})

test("output alone in a file is a redirect", () => {
  const out = statLike({ dev: 3, ino: 3 })
  expect(discardedBy(out, statLike({ dev: 4, ino: 4 }), NOWHERE)).toBe(
    "a file only this redirect opened"
  )
})

test("output at a terminal reaches whoever asked", () => {
  const out = statLike({ dev: 5, ino: 5, isFile: () => false })
  expect(discardedBy(out, ELSEWHERE, NOWHERE)).toBeNull()
})
