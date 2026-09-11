import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  ACTING_NAMED,
  agentIdsOf,
  blobIdOf,
  carriedInto,
  carryReadings,
  dropReadings,
  partly,
  READS_AT,
  readingFileAt,
  readingIn,
  recordRead,
  SEAT_NAMED,
  SUBAGENT_MARK,
  sameBody,
  seatIn,
  sweptReadings,
  writerIn,
} from "akasha/commands/modules/reading/reading.module.code.ts"
import {
  A,
  AGENT,
  B,
  DAY,
  OTHER,
  scratch,
  thinAt,
  UNDER,
} from "akasha/commands/modules/reading/reading.module.test-fixtures.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a blob id is git's own over the bytes", () => {
  const said = blobIdOf(new TextEncoder().encode("hello world\n"))
  expect(said).toBe("3b18e512dba79e4c8300dd08aeb37f8e728b8dad")
})

test("an empty body still has an id", () => {
  expect(blobIdOf(new Uint8Array())).toBe("e69de29bb2d1d6434b8b29ae775ad8c2e48c5391")
})

test("a reading is found by path, then by agent", () => {
  const at = readingFileAt("/r", AGENT, "akasha/x/y.ts")
  expect(at).toBe(join("/r", READS_AT, "path", "akasha/x/y.ts", "agent", "id", `${AGENT}.jsonl`))
})

test("a reading recorded is the reading read back", () => {
  const root = scratch.rootFor("akasha-reading-")
  const held = { path: "akasha/a.ts", oid: "abc123", seenAt: 1788000000000, carriedOid: null }
  recordRead(root, AGENT, held)
  expect(readingIn(root, AGENT, "akasha/a.ts")).toEqual(held)
})

test("a reading of a path replaces the one before it", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: "akasha/a.ts", oid: "one", seenAt: 1, carriedOid: null })
  recordRead(root, AGENT, { path: "akasha/a.ts", oid: "two", seenAt: 2, carriedOid: null })
  expect(readingIn(root, AGENT, "akasha/a.ts")?.oid).toBe("two")
})

test("one agent's reading is not another's", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: "akasha/a.ts", oid: "one", seenAt: 1, carriedOid: null })
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
  expect(readingIn(root, AGENT, A)).toEqual({ path: A, oid: "abc", seenAt: 1, carriedOid: null })
})

test("a mechanical id said as nothing at all is read as none", () => {
  const root = scratch.rootFor("akasha-reading-")
  thinAt(root, A, { path: A, oid: "abc", seenAt: 1, carriedOid: "" })
  expect(readingIn(root, AGENT, A)?.carriedOid).toBeNull()
})

test("the body read and the body a mechanical change left both answer, and no third", () => {
  const held = { path: A, oid: "one", seenAt: 1, carriedOid: "two" }
  expect(sameBody(held, "one")).toBe(true)
  expect(sameBody(held, "two")).toBe(true)
  expect(sameBody(held, "three")).toBe(false)
  expect(sameBody(null, "one")).toBe(false)
})

test("a reading of another body than the change started from is not carried", () => {
  const held = { path: A, oid: "one", seenAt: 1, carriedOid: null }
  expect(carriedInto(held, { was: A, now: B, from: "two" }, "three")).toBeNull()
})

test("a carry chains off the mechanical id, and the body read stays pinned", () => {
  const held = { path: A, oid: "one", seenAt: 1, carriedOid: "two" }
  expect(carriedInto(held, { was: A, now: B, from: "two" }, "three")).toEqual({
    path: B,
    oid: "one",
    seenAt: 1,
    carriedOid: "three",
  })
  expect(carriedInto(held, { was: A, now: B, from: "one" }, "three")).toBeNull()
})

test("a carried reading is at the new path and the old file is gone", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = writing(root, A, "one\n")
  const now = writing(root, B, "two\n")
  recordRead(root, AGENT, { path: A, oid: was, seenAt: 1, carriedOid: null })
  carryReadings(root, [{ was: A, now: B, from: was }])
  expect(readingIn(root, AGENT, B)).toEqual({
    path: B,
    oid: was,
    seenAt: 1,
    carriedOid: now,
  })
  expect(readingIn(root, AGENT, A)).toBeNull()
  expect(existsSync(readingFileAt(root, AGENT, A))).toBe(false)
})

test("a body rewritten where it is keeps its path and gains the mechanical id", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const now = writing(root, A, "two\n")
  recordRead(root, AGENT, { path: A, oid: was, seenAt: 1, carriedOid: null })
  carryReadings(root, [{ was: A, now: A, from: was }])
  expect(readingIn(root, AGENT, A)).toEqual({ path: A, oid: was, seenAt: 1, carriedOid: now })
  expect(existsSync(readingFileAt(root, AGENT, A))).toBe(true)
})

test("every agent holding the body is carried, not the first one found", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = writing(root, A, "one\n")
  const now = writing(root, B, "two\n")
  for (const one of [AGENT, OTHER]) {
    recordRead(root, one, { path: A, oid: was, seenAt: 1, carriedOid: null })
  }
  expect(agentIdsOf(root, A)).toEqual([OTHER, AGENT])
  carryReadings(root, [{ was: A, now: B, from: was }])
  for (const one of [AGENT, OTHER]) {
    expect(readingIn(root, one, B)?.carriedOid).toBe(now)
    expect(readingIn(root, one, A)).toBeNull()
  }
})

test("a removal forgets the reading, for every agent holding one", () => {
  const root = scratch.rootFor("akasha-reading-")
  for (const one of [AGENT, OTHER]) {
    recordRead(root, one, { path: A, oid: "one", seenAt: 1, carriedOid: null })
    recordRead(root, one, { path: B, oid: "two", seenAt: 1, carriedOid: null })
  }
  dropReadings(root, [A])
  for (const one of [AGENT, OTHER]) {
    expect(readingIn(root, one, A)).toBeNull()
    expect(existsSync(readingFileAt(root, one, A))).toBe(false)
    expect(readingIn(root, one, B)?.oid).toBe("two")
  }
})

test("forgetting a reading nobody holds takes nothing away and throws nothing", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: B, oid: "two", seenAt: 1, carriedOid: null })
  expect(() => dropReadings(root, [A])).not.toThrow()
  expect(() => dropReadings(scratch.rootFor("akasha-reading-"), [A])).not.toThrow()
  expect(readingIn(root, AGENT, B)?.oid).toBe("two")
})

test("the mark that opens a subagent's name is spelled here once", () => {
  expect(SUBAGENT_MARK).toBe("--")
  expect(SEAT_NAMED).toBe("AGENT_ID")
  expect(ACTING_NAMED).toBe("ACTING_AGENT_ID")
})

test("no seat named is no writer at all", () => {
  expect(writerIn({})).toBeNull()
  expect(writerIn({ [SEAT_NAMED]: "" })).toBeNull()
  expect(writerIn({ [SEAT_NAMED]: undefined })).toBeNull()
  expect(seatIn({})).toBeNull()
})

test("a seat named and nothing acting is the seat itself", () => {
  expect(writerIn({ [SEAT_NAMED]: AGENT })).toBe(AGENT)
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: "" })).toBe(AGENT)
  expect(seatIn({ [SEAT_NAMED]: AGENT })).toBe(AGENT)
})

test("an acting name the seat's own id begins is the writer", () => {
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: UNDER })).toBe(UNDER)
})

test("an acting name another seat's id begins is not honoured", () => {
  const said = `${OTHER}${SUBAGENT_MARK}sub-one`
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: said })).toBe(AGENT)
})

test("an acting name no seat begins is not honoured", () => {
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: "sub-one" })).toBe(AGENT)
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: AGENT })).toBe(AGENT)
})

test("an acting name is honoured at the mark and not at a shorter cut of the seat", () => {
  const said = `${AGENT.slice(0, 8)}${SUBAGENT_MARK}sub-one`
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: said })).toBe(AGENT)
  expect(writerIn({ [SEAT_NAMED]: AGENT, [ACTING_NAMED]: `${AGENT}-sub` })).toBe(AGENT)
})

test("an acting name without a seat named is not honoured either", () => {
  expect(writerIn({ [ACTING_NAMED]: UNDER })).toBeNull()
  expect(writerIn({ [SEAT_NAMED]: "", [ACTING_NAMED]: UNDER })).toBeNull()
})

test("a subagent's readings sit under its own name and not its seat's", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, UNDER, { path: A, oid: "one", seenAt: 1, carriedOid: null })
  expect(readingIn(root, UNDER, A)?.oid).toBe("one")
  expect(readingIn(root, AGENT, A)).toBeNull()
})

test("a seat's readings do not sit under its subagent's name", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: A, oid: "one", seenAt: 1, carriedOid: null })
  expect(readingIn(root, UNDER, A)).toBeNull()
})

test("a composite owner is a folder of its own beside the seat's", () => {
  const root = scratch.rootFor("akasha-reading-")
  for (const one of [AGENT, UNDER]) {
    recordRead(root, one, { path: A, oid: one, seenAt: 1, carriedOid: null })
  }
  expect(agentIdsOf(root, A)).toEqual([AGENT, UNDER])
})

test("a sweep takes the agent it names and leaves another agent's fresh reading", () => {
  const root = scratch.rootFor("akasha-reading-")
  const now = Date.now()
  for (const one of [AGENT, OTHER]) {
    recordRead(root, one, { path: A, oid: one, seenAt: now, carriedOid: null })
  }
  expect(sweptReadings(root, AGENT, now - DAY)).toEqual({ agent: 1, stale: 0 })
  expect(readingIn(root, AGENT, A)).toBeNull()
  expect(readingIn(root, OTHER, A)?.oid).toBe(OTHER)
})

test("a sweep takes every reading last seen before the moment it is handed", () => {
  const root = scratch.rootFor("akasha-reading-")
  const now = Date.now()
  recordRead(root, AGENT, { path: A, oid: "old", seenAt: now - DAY - 1, carriedOid: null })
  recordRead(root, OTHER, { path: B, oid: "new", seenAt: now, carriedOid: null })
  expect(sweptReadings(root, null, now - DAY)).toEqual({ agent: 0, stale: 1 })
  expect(readingIn(root, AGENT, A)).toBeNull()
  expect(readingIn(root, OTHER, B)?.oid).toBe("new")
})

test("a sweep leaves behind no directory holding nothing", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: A, oid: "one", seenAt: 1, carriedOid: null })
  sweptReadings(root, null, Date.now() - DAY)
  expect(existsSync(join(root, READS_AT, "path", "akasha"))).toBe(false)
})

test("a sweep over a record that is not there takes nothing and throws nothing", () => {
  const root = scratch.rootFor("akasha-reading-")
  expect(sweptReadings(root, AGENT, Date.now())).toEqual({ agent: 0, stale: 0 })
})

test("a reading whose line will not parse is swept as stale", () => {
  const root = scratch.rootFor("akasha-reading-")
  const at = readingFileAt(root, AGENT, A)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, "{ not json\n")
  expect(sweptReadings(root, null, 0).stale).toBe(1)
  expect(existsSync(at)).toBe(false)
})

test("a line carrying no reach into the body means the whole body reached the agent", () => {
  const root = scratch.rootFor("akasha-reading-")
  thinAt(root, A, { path: A, oid: "abc", seenAt: 1, carriedOid: null })
  const held = readingIn(root, AGENT, A)
  expect(partly(held)).toBe(false)
  expect(sameBody(held, "abc")).toBe(true)
})

test("a reach into the body is written and read back", () => {
  const root = scratch.rootFor("akasha-reading-")
  recordRead(root, AGENT, { path: A, oid: "abc", seenAt: 1, carriedOid: null, readThrough: 42 })
  expect(readingIn(root, AGENT, A)?.readThrough).toBe(42)
})

test("a reading carrying a reach into the body answers no body", () => {
  const held = { path: A, oid: "one", seenAt: 1, carriedOid: "two", readThrough: 5 }
  expect(sameBody(held, "one")).toBe(false)
  expect(sameBody(held, "two")).toBe(false)
  expect(sameBody({ ...held, readThrough: null }, "one")).toBe(true)
})

test("a reach that is no whole line count is no reach", () => {
  const root = scratch.rootFor("akasha-reading-")
  for (const said of [0, -1, 1.5, "7", null]) {
    thinAt(root, A, { path: A, oid: "abc", seenAt: 1, carriedOid: null, readThrough: said })
    expect(partly(readingIn(root, AGENT, A))).toBe(false)
  }
})

test("a carry moves how far into the body the agent had read", () => {
  const held = { path: A, oid: "one", seenAt: 1, carriedOid: "two", readThrough: 9 }
  const carried = carriedInto(held, { was: A, now: B, from: "two" }, "three")
  expect(carried?.readThrough).toBe(9)
  expect(sameBody(carried, "three")).toBe(false)
})

test("a line the record already holds answers under the key that line was written with", () => {
  const root = scratch.rootFor("akasha-reading-")
  const was = { path: A, oid: "one", seenAt: 1 }
  thinAt(root, A, { ...was, mechanicalOid: "two" })
  expect(sameBody(readingIn(root, AGENT, A), "two")).toBe(true)
  thinAt(root, A, { ...was, carriedOid: null, mechanicalOid: "two" })
  expect(sameBody(readingIn(root, AGENT, A), "two")).toBe(true)
  thinAt(root, A, { ...was, carriedOid: "three", mechanicalOid: "two" })
  expect(sameBody(readingIn(root, AGENT, A), "three")).toBe(true)
})
