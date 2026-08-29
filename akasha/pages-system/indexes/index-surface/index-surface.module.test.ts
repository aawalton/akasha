import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import { beneath, overlaidOn, readingAt } from "./index-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function seeded(): string {
  const at = scratch.rootFor("akasha-surface-")
  put(at, "identity/page/id/one.jsonl", '{"id":"one"}\n')
  put(at, "identity/page/id/two.jsonl", '{"id":"two"}\n')
  put(at, "identity/domain/slug/a.jsonl", '{"slug":"a"}\n')
  put(at, "import/path/akasha/held.ts.jsonl", '{"path":"one"}\n{"path":"two"}\n')
  return at
}

function namesIn(said: readonly { readonly name: string }[]): readonly string[] {
  return said.map((one) => one.name).sort()
}

function everythingUnder(reading: ReturnType<typeof readingAt>, at: string): readonly string[] {
  const found: string[] = []
  for (const one of reading.listing(at)) {
    const next = beneath(at, one.name)
    if (one.directory) found.push(...everythingUnder(reading, next))
    else found.push(next)
  }
  return found.sort()
}

test("a reading off the disk answers the three reads of the index it is rooted at", () => {
  const reading = readingAt(seeded())
  expect(reading.holds("identity/page/id/one.jsonl")).toBe(true)
  expect(reading.holds("identity/page/id/three.jsonl")).toBe(false)
  expect(namesIn(reading.listing("identity"))).toEqual(["domain", "page"])
  expect(reading.listing("identity")[0]?.directory).toBe(true)
  expect(reading.lines("import/path/akasha/held.ts.jsonl")).toEqual([
    '{"path":"one"}',
    '{"path":"two"}',
  ])
})

test("a directory that is not there lists nothing, and a file that is not there holds no lines", () => {
  const reading = readingAt(seeded())
  expect(reading.listing("nowhere")).toEqual([])
  expect(reading.lines("nowhere.jsonl")).toEqual([])
})

test("a file the change touches answers its own lines, and every other file answers the index", () => {
  const under = readingAt(seeded())
  const reading = overlaidOn(under, [
    { at: "import/path/akasha/held.ts.jsonl", lines: ['{"path":"one"}', '{"path":"three"}'] },
  ])
  expect(reading.lines("import/path/akasha/held.ts.jsonl")).toEqual([
    '{"path":"one"}',
    '{"path":"three"}',
  ])
  expect(reading.lines("identity/page/id/one.jsonl")).toEqual(['{"id":"one"}'])
  expect(under.lines("import/path/akasha/held.ts.jsonl")).toEqual([
    '{"path":"one"}',
    '{"path":"two"}',
  ])
})

test("a file the change adds stands and lists, and the directories above it are listed too", () => {
  const reading = overlaidOn(readingAt(seeded()), [
    { at: "identity/module/slug/new.jsonl", lines: ['{"slug":"new"}'] },
  ])
  expect(reading.holds("identity/module/slug/new.jsonl")).toBe(true)
  expect(namesIn(reading.listing("identity"))).toEqual(["domain", "module", "page"])
  expect(namesIn(reading.listing("identity/module/slug"))).toEqual(["new.jsonl"])
  expect(reading.listing("identity")).toContainEqual({ name: "module", directory: true })
})

test("a file the change empties does not stand and is not listed", () => {
  const reading = overlaidOn(readingAt(seeded()), [{ at: "identity/page/id/one.jsonl", lines: [] }])
  expect(reading.holds("identity/page/id/one.jsonl")).toBe(false)
  expect(reading.lines("identity/page/id/one.jsonl")).toEqual([])
  expect(namesIn(reading.listing("identity/page/id"))).toEqual(["two.jsonl"])
})

test("a directory left with nothing standing under it is not listed", () => {
  const reading = overlaidOn(readingAt(seeded()), [
    { at: "identity/domain/slug/a.jsonl", lines: [] },
  ])
  expect(namesIn(reading.listing("identity"))).toEqual(["page"])
  expect(reading.holds("identity/domain")).toBe(false)
  expect(reading.listing("identity/domain/slug")).toEqual([])
})

test("a directory keeping one file standing is still listed", () => {
  const reading = overlaidOn(readingAt(seeded()), [{ at: "identity/page/id/one.jsonl", lines: [] }])
  expect(namesIn(reading.listing("identity"))).toEqual(["domain", "page"])
  expect(reading.holds("identity/page/id")).toBe(true)
})

test("a directory emptied and filled again in one change is listed", () => {
  const reading = overlaidOn(readingAt(seeded()), [
    { at: "identity/domain/slug/a.jsonl", lines: [] },
    { at: "identity/domain/slug/b.jsonl", lines: ['{"slug":"b"}'] },
  ])
  expect(namesIn(reading.listing("identity/domain/slug"))).toEqual(["b.jsonl"])
  expect(reading.holds("identity/domain")).toBe(true)
})

test("a walk over the laid reading answers what the change leaves and nothing else", () => {
  const reading = overlaidOn(readingAt(seeded()), [
    { at: "identity/domain/slug/a.jsonl", lines: [] },
    { at: "identity/module/slug/new.jsonl", lines: ['{"slug":"new"}'] },
    { at: "import/path/akasha/held.ts.jsonl", lines: ['{"path":"one"}'] },
  ])
  expect(everythingUnder(reading, "")).toEqual([
    "identity/module/slug/new.jsonl",
    "identity/page/id/one.jsonl",
    "identity/page/id/two.jsonl",
    "import/path/akasha/held.ts.jsonl",
  ])
})

test("a reading laid over another with nothing to lay answers what stands under it", () => {
  const at = seeded()
  expect(everythingUnder(overlaidOn(readingAt(at), []), "")).toEqual(
    everythingUnder(readingAt(at), "")
  )
})
