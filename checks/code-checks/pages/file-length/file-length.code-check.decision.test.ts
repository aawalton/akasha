import { afterAll, expect, test } from "bun:test"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { shadowAt } from "@akasha/pages/shadow"
import {
  CEILING,
  exemptIn,
  heldOff,
  MARKUP_CEILING,
  PROSE_CEILING,
  reasonsIn,
  WHOLE_PROSE_CEILING,
} from "./file-length.code-check.decision.code.ts"
import {
  ELSEWHERE,
  LOCKFILE,
  letOff,
  SKETCHBOOK,
  scratch,
  seeded,
} from "./file-length.code-check.test-fixtures.ts"

const HELD = "akasha/held.ts"

const ENTRY = "akasha/day.wake-day.completed-tasks.jsonl"

const MARKUP = "akasha/panel.eso-interface.markup.xml"

const BINDINGS = "akasha/one.eso-addon.bindings.xml"

afterAll(scratch.sweep)

test("a body under the ceiling is let through", () => {
  expect(reasonsIn(HELD, CEILING - 1)).toEqual([])
})

test("a body exactly at the ceiling is let through, so the ceiling is the last size allowed", () => {
  expect(reasonsIn(HELD, CEILING)).toEqual([])
})

test("a body over the ceiling is refused, and the reason names the size and the ceiling", () => {
  const said = reasonsIn(HELD, CEILING + 1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes")
  expect(said[0]).toContain("15,000 byte ceiling")
})

test("an empty body is let through", () => {
  expect(reasonsIn(HELD, 0)).toEqual([])
})

test("what the file is named decides which ceiling that file is held to", () => {
  for (const named of [HELD, "akasha/notes.txt", "akasha/notes.md"]) {
    expect(reasonsIn(named, CEILING + 1)).toHaveLength(1)
  }
  expect(reasonsIn(ENTRY, CEILING + 1)).toEqual([])
  expect(reasonsIn(MARKUP, CEILING + 1)).toEqual([])
})

test("an entry file at its own ceiling is let through", () => {
  expect(reasonsIn(ENTRY, ENTRY_CEILING)).toEqual([])
})

test("an entry file over its own ceiling is refused, and the reason names that ceiling", () => {
  const said = reasonsIn(ENTRY, ENTRY_CEILING + 1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("8,388,609 bytes")
  expect(said[0]).toContain("8,388,608 byte ceiling")
})

test("a `jsonl` akasha cannot read a page name in is held to the narrow ceiling", () => {
  expect(reasonsIn("akasha/held.jsonl", CEILING + 1)).toHaveLength(1)
})

test("the markup ceiling sits between the narrow ceiling and the entry ceiling", () => {
  expect(MARKUP_CEILING).toBeGreaterThan(CEILING)
  expect(MARKUP_CEILING).toBeLessThan(ENTRY_CEILING)
})

test("a markup file at its own ceiling is let through", () => {
  expect(reasonsIn(MARKUP, MARKUP_CEILING)).toEqual([])
})

test("a markup file over its own ceiling is refused, and the reason names that ceiling", () => {
  const said = reasonsIn(MARKUP, MARKUP_CEILING + 1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("131,073 bytes")
  expect(said[0]).toContain("131,072 byte ceiling")
})

test("a too-long markup file's refusal names the division an addon's manifest admits", () => {
  const said = reasonsIn(MARKUP, MARKUP_CEILING + 1)
  expect(said[0]).toContain("divide this one at a top-level element")
})

test("the bindings an addon holds are markup too, so they are held to the markup ceiling", () => {
  expect(reasonsIn(BINDINGS, CEILING + 1)).toEqual([])
  expect(reasonsIn(BINDINGS, MARKUP_CEILING + 1)).toHaveLength(1)
})

test("an `xml` akasha cannot read a page name in is held to the narrow ceiling", () => {
  expect(reasonsIn("akasha/held.xml", CEILING + 1)).toHaveLength(1)
})

test("an entry file is still held wider than a markup file", () => {
  expect(reasonsIn(MARKUP, ENTRY_CEILING)).toHaveLength(1)
  expect(reasonsIn(ENTRY, ENTRY_CEILING)).toEqual([])
})

test("a body far over the ceiling is refused once rather than once for each line", () => {
  expect(reasonsIn(HELD, CEILING * 4)).toHaveLength(1)
})

test("where the file sits changes nothing, because the size is judged against the name alone", () => {
  const one = reasonsIn(HELD, CEILING + 1)
  const two = reasonsIn("akasha/deep/down/held.ts", CEILING + 1)
  expect(one).toEqual(two)
})

test("a too-long test file's refusal names the fixtures beside it", () => {
  const said = reasonsIn("akasha/held.module.test.ts", CEILING + 1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes, over the 15,000 byte ceiling")
  expect(said[0]).toContain("`test-fixtures`")
})

test("a too-long file that is no test is refused in the words it was refused in before", () => {
  const said = reasonsIn("akasha/held.module.code.ts", CEILING + 1)
  expect(said).toEqual(["15,001 bytes, over the 15,000 byte ceiling"])
})

test("a test file under the ceiling is let through, so naming the relief refuses nothing new", () => {
  expect(reasonsIn("akasha/held.module.test.ts", CEILING)).toEqual([])
})

test("prose beside a page is held wider than a code file, whatever the page type", () => {
  expect(reasonsIn("akasha/one.book-section.chapter-text.md", CEILING + 1)).toEqual([])
  expect(reasonsIn("akasha/one.story-chapter-read.prose.txt", CEILING + 1)).toEqual([])
})

test("prose over its own ceiling is refused, and the refusal names what dividing it costs", () => {
  const said = reasonsIn("akasha/one.book-section.chapter-text.md", PROSE_CEILING + 1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("131,072 byte ceiling")
  expect(said[0]).toContain("hides all but the first")
})

const WHOLE = "akasha/one.story-chapter-read.prose.txt"

const PART = "akasha/one.story-chapter-read.prose.part2.txt"

const OTHER = "akasha/one.book-section.chapter-text.md"

test("the whole prose of a page is held wider than other prose, because dividing it is what hid it", () => {
  expect(reasonsIn(WHOLE, PROSE_CEILING + 1)).toEqual([])
  expect(reasonsIn(WHOLE, WHOLE_PROSE_CEILING)).toEqual([])
})

test("prose over the widest ceiling is refused, and the refusal names what dividing it costs", () => {
  const said = reasonsIn(WHOLE, WHOLE_PROSE_CEILING + 1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("524,288 byte ceiling")
  expect(said[0]).toContain("hides all but the first")
})

test("a part of a prose file is held to the same wide ceiling, so dividing one buys nothing", () => {
  expect(reasonsIn(PART, PROSE_CEILING + 1)).toEqual([])
  expect(reasonsIn(PART, WHOLE_PROSE_CEILING + 1)).toHaveLength(1)
})

test("prose under another property keeps the narrower ceiling, so the wider one reaches `prose` alone", () => {
  expect(reasonsIn(OTHER, PROSE_CEILING)).toEqual([])
  expect(reasonsIn(OTHER, PROSE_CEILING + 1)).toHaveLength(1)
})

test("the widest prose ceiling is wider than markup and narrower than an entry file", () => {
  expect(WHOLE_PROSE_CEILING).toBeGreaterThan(PROSE_CEILING)
  expect(WHOLE_PROSE_CEILING).toBeLessThan(ENTRY_CEILING)
})

test("a property saying false is the one this check lets off", () => {
  expect(heldOff({ runsFileLength: false, fileName: LOCKFILE })).toBe(true)
})

test("a property saying nothing is judged", () => {
  expect(heldOff({ fileName: LOCKFILE })).toBe(false)
})

test("a property saying true is judged", () => {
  expect(heldOff({ runsFileLength: true, fileName: LOCKFILE })).toBe(false)
})

test("a file beside the page carrying the property saying false is let off the ceiling", () => {
  expect(exemptIn(LOCKFILE, shadowAt(letOff()))).toBe(true)
})

test("a file named by a property of a kind under file-property is let off just the same", () => {
  expect(exemptIn(SKETCHBOOK, shadowAt(letOff()))).toBe(true)
})

test("a file of that name in another folder is held to the ceiling", () => {
  expect(exemptIn(ELSEWHERE, shadowAt(letOff()))).toBe(false)
})

test("a file beside the page that no property names is held to the ceiling", () => {
  expect(exemptIn("package.json", shadowAt(letOff()))).toBe(false)
})

test("a property saying nothing leaves the file it names held to the ceiling", () => {
  expect(exemptIn(LOCKFILE, shadowAt(seeded({ fileName: LOCKFILE })))).toBe(false)
})

test("a property saying true leaves the file it names held to the ceiling", () => {
  const root = seeded({ fileName: LOCKFILE, runsFileLength: true })
  expect(exemptIn(LOCKFILE, shadowAt(root))).toBe(false)
})

test("a property naming no file leaves every file held to the ceiling", () => {
  expect(exemptIn(LOCKFILE, shadowAt(seeded({ runsFileLength: false })))).toBe(false)
})

const UNDER = "seat/pages/one-a1.workspace"

const DRAFT = `${UNDER}.patch.diff`

const LATER = `${UNDER}.patch.part2.diff`

const NOTED = `${UNDER}.notes.diff`

const NEITHER = `${UNDER}.nothing.diff`

const SKETCHED = `${UNDER}.sketch.diff`

const SECTIONED = "akasha/one.workspace.lockfile.ts"

test("a file whose section names a property saying false is let off the ceiling", () => {
  expect(exemptIn(DRAFT, shadowAt(letOff()))).toBe(true)
})

test("a later part of that property's file is let off as the first part is", () => {
  expect(exemptIn(LATER, shadowAt(letOff()))).toBe(true)
})

test("a file whose section names a property saying nothing is held to the ceiling", () => {
  expect(exemptIn(NOTED, shadowAt(letOff()))).toBe(false)
})

test("a file whose section names no property is held to the ceiling", () => {
  expect(exemptIn(NEITHER, shadowAt(letOff()))).toBe(false)
})

test("a property of a kind this check names nowhere lets its files off just the same", () => {
  expect(exemptIn(SKETCHED, shadowAt(letOff()))).toBe(true)
})

test("that same section under a page type carrying no such property is held to the ceiling", () => {
  expect(exemptIn("seat/pages/one-a1.subagent.patch.diff", shadowAt(letOff()))).toBe(false)
})

test("a property naming its file outright lets off no file sectioned by its slug", () => {
  expect(exemptIn(SECTIONED, shadowAt(letOff()))).toBe(false)
})
