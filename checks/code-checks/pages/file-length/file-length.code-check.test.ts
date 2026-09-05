import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import {
  idFiled,
  listedFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import type { Value } from "@akasha/pages-system/page-value"
import { shadowAt } from "@akasha/pages-system/shadow"
import { bodiesIn } from "@akasha/testing-system/bodying"
import { onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  CEILING,
  exemptIn,
  fileLength,
  heldOff,
  MARKUP_CEILING,
  PROSE_CEILING,
  reasonsIn,
  WHOLE_PROSE_CEILING,
} from "./file-length.code-check.code.ts"

const ROOT = "/repo"

const ENTRY = "akasha/day.wake-day.completed-tasks.jsonl"

const MARKUP = "akasha/panel.eso-interface.markup.xml"

const BINDINGS = "akasha/one.eso-addon.bindings.xml"

const given = bodiesIn(ROOT)

function sized(held: number): Uint8Array {
  return new Uint8Array(held).fill(0x61)
}

test("a body under the ceiling is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(CEILING - 1)))).toEqual([])
})

test("a body exactly at the ceiling is let through, so the ceiling is the last size allowed", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(CEILING)))).toEqual([])
})

test("a body over the ceiling is refused, and the reason names the size and the ceiling", () => {
  const said = reasonsIn(given("akasha/held.ts", sized(CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes")
  expect(said[0]).toContain("15,000 byte ceiling")
})

test("an empty body is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(0)))).toEqual([])
})

test("the size counted is bytes rather than characters", () => {
  const one = new TextEncoder().encode("é".repeat(CEILING))
  expect(one.byteLength).toBe(CEILING * 2)
  expect(reasonsIn(given("akasha/held.ts", one))).toHaveLength(1)
})

test("a body that is not text is judged by its size the same as one that is", () => {
  const held = sized(CEILING + 8)
  held[0] = 0xff
  held[1] = 0xfe
  expect(reasonsIn(given("akasha/held.ts", held))).toHaveLength(1)
})

test("what the file is named decides which ceiling that file is held to", () => {
  const held = sized(CEILING + 1)
  for (const named of ["akasha/held.ts", "akasha/notes.txt", "akasha/notes.md"]) {
    expect(reasonsIn(given(named, held))).toHaveLength(1)
  }
  expect(reasonsIn(given(ENTRY, held))).toEqual([])
  expect(reasonsIn(given(MARKUP, held))).toEqual([])
})

test("an entry file at its own ceiling is let through", () => {
  expect(reasonsIn(given(ENTRY, sized(ENTRY_CEILING)))).toEqual([])
})

test("an entry file over its own ceiling is refused, and the reason names that ceiling", () => {
  const said = reasonsIn(given(ENTRY, sized(ENTRY_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("8,388,609 bytes")
  expect(said[0]).toContain("8,388,608 byte ceiling")
})

test("a `jsonl` akasha cannot read a page name in is held to the narrow ceiling", () => {
  expect(reasonsIn(given("akasha/held.jsonl", sized(CEILING + 1)))).toHaveLength(1)
})

test("the markup ceiling sits between the narrow ceiling and the entry ceiling", () => {
  expect(MARKUP_CEILING).toBeGreaterThan(CEILING)
  expect(MARKUP_CEILING).toBeLessThan(ENTRY_CEILING)
})

test("a markup file at its own ceiling is let through", () => {
  expect(reasonsIn(given(MARKUP, sized(MARKUP_CEILING)))).toEqual([])
})

test("a markup file over its own ceiling is refused, and the reason names that ceiling", () => {
  const said = reasonsIn(given(MARKUP, sized(MARKUP_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("131,073 bytes")
  expect(said[0]).toContain("131,072 byte ceiling")
})

test("a too-long markup file's refusal names the division an addon's manifest admits", () => {
  const said = reasonsIn(given(MARKUP, sized(MARKUP_CEILING + 1)))
  expect(said[0]).toContain("divide this one at a top-level element")
})

test("the bindings an addon holds are markup too, so they are held to the markup ceiling", () => {
  expect(reasonsIn(given(BINDINGS, sized(CEILING + 1)))).toEqual([])
  expect(reasonsIn(given(BINDINGS, sized(MARKUP_CEILING + 1)))).toHaveLength(1)
})

test("an `xml` akasha cannot read a page name in is held to the narrow ceiling", () => {
  expect(reasonsIn(given("akasha/held.xml", sized(CEILING + 1)))).toHaveLength(1)
})

test("an entry file is still held wider than a markup file", () => {
  expect(reasonsIn(given(MARKUP, sized(ENTRY_CEILING)))).toHaveLength(1)
  expect(reasonsIn(given(ENTRY, sized(ENTRY_CEILING)))).toEqual([])
})

test("a body far over the ceiling is refused once rather than once for each line", () => {
  const held = new TextEncoder().encode("one\n".repeat(CEILING))
  expect(reasonsIn(given("akasha/held.ts", held))).toHaveLength(1)
})

test("where the file stands changes nothing, because the size is read from the body alone", () => {
  const held = sized(CEILING + 1)
  const one = reasonsIn({ root: "/repo", path: "akasha/held.ts", bytes: held })
  const two = reasonsIn({ root: "/elsewhere", path: "akasha/deep/down/held.ts", bytes: held })
  expect(one).toEqual(two)
})

test("a too-long test file's refusal names the fixtures standing beside it", () => {
  const said = reasonsIn(given("akasha/held.module.test.ts", sized(CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes, over the 15,000 byte ceiling")
  expect(said[0]).toContain("`test-fixtures`")
})

test("a too-long file that is no test is refused in the words it was refused in before", () => {
  const said = reasonsIn(given("akasha/held.module.code.ts", sized(CEILING + 1)))
  expect(said).toEqual(["15,001 bytes, over the 15,000 byte ceiling"])
})

test("a test file under the ceiling is let through, so naming the relief refuses nothing new", () => {
  expect(reasonsIn(given("akasha/held.module.test.ts", sized(CEILING)))).toEqual([])
})

test("prose beside a page is held wider than a code file, whatever the page type", () => {
  const held = sized(CEILING + 1)
  expect(reasonsIn(given("akasha/one.book-chapter.chapter-text.md", held))).toEqual([])
  expect(reasonsIn(given("akasha/one.story-chapter-read.prose.txt", held))).toEqual([])
})

test("prose over its own ceiling is refused, and the refusal names what dividing it costs", () => {
  const at = "akasha/one.book-chapter.chapter-text.md"
  const said = reasonsIn(given(at, sized(PROSE_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("131,072 byte ceiling")
  expect(said[0]).toContain("hides all but the first")
})

const WHOLE = "akasha/one.story-chapter-read.prose.txt"

const PART = "akasha/one.story-chapter-read.prose.part2.txt"

const OTHER = "akasha/one.book-chapter.chapter-text.md"

test("the whole prose of a page is held wider than other prose, because dividing it is what hid it", () => {
  expect(reasonsIn(given(WHOLE, sized(PROSE_CEILING + 1)))).toEqual([])
  expect(reasonsIn(given(WHOLE, sized(WHOLE_PROSE_CEILING)))).toEqual([])
})

test("prose over the widest ceiling is refused, and the refusal names what dividing it costs", () => {
  const said = reasonsIn(given(WHOLE, sized(WHOLE_PROSE_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("524,288 byte ceiling")
  expect(said[0]).toContain("hides all but the first")
})

test("a part of a prose file is held to the same wide ceiling, so dividing one buys nothing", () => {
  expect(reasonsIn(given(PART, sized(PROSE_CEILING + 1)))).toEqual([])
  expect(reasonsIn(given(PART, sized(WHOLE_PROSE_CEILING + 1)))).toHaveLength(1)
})

test("prose under another property keeps the narrower ceiling, so the wider one reaches `prose` alone", () => {
  expect(reasonsIn(given(OTHER, sized(PROSE_CEILING)))).toEqual([])
  expect(reasonsIn(given(OTHER, sized(PROSE_CEILING + 1)))).toHaveLength(1)
})

test("the widest prose ceiling is wider than markup and narrower than an entry file", () => {
  expect(WHOLE_PROSE_CEILING).toBeGreaterThan(PROSE_CEILING)
  expect(WHOLE_PROSE_CEILING).toBeLessThan(ENTRY_CEILING)
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const LOCKFILE = "bun.lock"

const NAMED = "named-file-property"

const PROPERTY_AT = "akasha/lockfile.named-file-property.ts"

const PROPERTY_ID = "01a06d55-0000-7000-8000-00000000000a"

const TYPE_AT = "akasha/workspace.page-type.ts"

const TYPE_ID = "01a06d55-0000-7000-8000-00000000000b"

const OWNER_AT = "one.workspace.ts"

const OWNER_ID = "01a06d55-0000-7000-8000-00000000000c"

const ELSEWHERE = "node_modules/one/bun.lock"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const DRAFTED = "drafted-file-property"

const STEM = "01a06d55-0000-7000-8000-0000000000"

const ABOVE: readonly (readonly [string, string])[] = [
  [FILE_PROPERTY, "page-type/page-property"],
  [NAMED, `page-type/${FILE_PROPERTY}`],
  [DRAFTED, `page-type/${FILE_PROPERTY}`],
]

const CARRIED: readonly Value[] = [
  { pageTypeSlug: FILE_PROPERTY, slug: "patch", propertySlug: "patch", runsFileLength: false },
  { pageTypeSlug: FILE_PROPERTY, slug: "notes", propertySlug: "notes" },
  { pageTypeSlug: DRAFTED, slug: "sketch", propertySlug: "sketch", runsFileLength: false },
]

function alsoSeeded(root: string): undefined {
  let held = 20
  const filing = (kind: string, slug: string, path: string, value: Value): undefined => {
    const id = `${STEM}${held}`
    held += 1
    listedFiled(root, kind, slug, [{ path, id }])
    idFiled(root, id, [{ path, id }])
    valueAlsoFiled(root, kind, [{ path, value }])
  }
  for (const [slug, above] of ABOVE) {
    const value = { pageTypeSlug: PAGE_TYPE, slug, extendsSlug: [above] }
    filing(PAGE_TYPE, slug, `akasha/${slug}.page-type.ts`, value)
  }
  for (const value of CARRIED) {
    const kind = String(value["pageTypeSlug"])
    const slug = String(value["slug"])
    filing(kind, slug, `akasha/${slug}.${kind}.ts`, value)
  }
}

function seeded(value: Value): string {
  const root = scratch.rootFor("akasha-file-length-")
  listedFiled(root, NAMED, "lockfile", [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  idFiled(root, PROPERTY_ID, [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  schemaFiled(root, NAMED, "lockfile", [
    {
      pageTypeSlug: NAMED,
      targetPageTypeSlug: null,
      unique: null,
      slug: "lockfile",
      propertySlug: "lockfile",
      fileName: LOCKFILE,
    },
  ])
  valueAlsoFiled(root, NAMED, [{ path: PROPERTY_AT, value }])
  listedFiled(root, "page-type", "workspace", [{ path: TYPE_AT, id: TYPE_ID }])
  idFiled(root, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  listedFiled(root, "workspace", "one", [{ path: OWNER_AT, id: OWNER_ID }])
  relationFiled(root, PROPERTY_ID, "page-property-slug", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  alsoSeeded(root)
  return root
}

function letOff(): string {
  return seeded({ fileName: LOCKFILE, runsFileLength: false })
}

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

test("the check lets off the file beside the page and refuses the one elsewhere", () => {
  const root = letOff()
  const over = "a".repeat(CEILING + 1)
  writing(root, LOCKFILE, over)
  writing(root, ELSEWHERE, over)
  const both = onDisk(root)
  const change = { root, changed: [LOCKFILE, ELSEWHERE], before: both, after: both }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([ELSEWHERE])
})

const UNDER = "seat/pages/one-a1.subagent"

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

test("a property naming its file outright lets off no file sectioned by its slug", () => {
  expect(exemptIn(SECTIONED, shadowAt(letOff()))).toBe(false)
})

test("the check lets off the draft and refuses the file no property lets off", () => {
  const root = letOff()
  const over = "a".repeat(CEILING + 1)
  writing(root, DRAFT, over)
  writing(root, NOTED, over)
  const both = onDisk(root)
  const change = { root, changed: [DRAFT, NOTED], before: both, after: both }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([NOTED])
})
