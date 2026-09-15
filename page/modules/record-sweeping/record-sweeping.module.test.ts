import { expect, test } from "bun:test"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  keptFrom,
  packed,
  reportOf,
  sectionsOfType,
  streamsIn,
  streamThere,
} from "akasha/page/modules/record-sweeping/record-sweeping.module.code.ts"

type Held = Record<string, unknown>

type Page = {
  readonly name: string
  readonly path: string
  readonly value: Held | null
}

const HOURS = 24

const HOOK = "a/one.hook.ts"

const CHECK = "b/two.check.ts"

const GROUP = "c/audit.held-group.ts"

const aType = (slug: string, above: readonly string[], properties: readonly Held[]): Held => ({
  slug,
  extends: above,
  properties,
})

const aProperty = (slug: string, hours: number | null): Held =>
  hours === null ? { slug, propertySlug: slug } : { slug, propertySlug: slug, keptForHours: hours }

const TYPES: readonly Held[] = [
  aType(
    "page",
    [],
    [{ pageProperty: "file-property/entries" }, { pageProperty: "file-property/lines" }]
  ),
  aType("page-property", ["page-type/page"], []),
  aType("file-property-group", ["page-type/page-property"], []),
  aType("held-group", ["page-type/file-property-group"], [{ pageProperty: "file-property/logs" }]),
  aType("hook", ["page-type/page"], []),
  aType("check", ["page-type/page"], [{ pageProperty: "held-group/audit" }]),
]

const PROPERTIES: readonly Held[] = [
  aProperty("entries", HOURS),
  aProperty("logs", HOURS),
  aProperty("lines", null),
]

function carrying(pageTypeSlug: string, values: readonly Held[]): readonly Page[] {
  return values.map((one) => {
    const slug = String(one["slug"])
    return { name: slug, path: `${slug}.${pageTypeSlug}.ts`, value: one }
  })
}

const PAGES: ReadonlyMap<string, readonly Page[]> = new Map([
  ["page-type", carrying("page-type", TYPES)],
  ["file-property", carrying("file-property", PROPERTIES)],
  ["hook", [{ name: "one", path: HOOK, value: null }]],
  ["check", [{ name: "two", path: CHECK, value: null }]],
  ["held-group", [{ name: "audit", path: GROUP, value: null }]],
])

function bodiesIn(): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const pages of PAGES.values()) {
    for (const one of pages) {
      if (one.value === null) continue
      found.set(one.path, `export const held = ${JSON.stringify(one.value)}\n`)
    }
  }
  return found
}

const BODIES = bodiesIn()

function slugFolder(pageTypeSlug: string): string {
  return `page-type/${pageTypeSlug}/slug`
}

const READING: Reading = {
  holds: (at) => at === "",
  listing: (at) => {
    for (const [pageTypeSlug, pages] of PAGES) {
      if (at !== slugFolder(pageTypeSlug)) continue
      return pages.map((one) => ({ name: `${one.name}.jsonl`, directory: false }))
    }
    return []
  },
  lines: (at) => {
    for (const [pageTypeSlug, pages] of PAGES) {
      for (const one of pages) {
        if (at !== `${slugFolder(pageTypeSlug)}/${one.name}.jsonl`) continue
        return [JSON.stringify({ path: one.path, id: one.name })]
      }
    }
    return []
  },
  read: (path) => BODIES.get(path) ?? null,
}

const THERE: ReadonlySet<string> = new Set([
  "a/one.hook.entries.uncommitted.jsonl",
  "a/one.hook.lines.uncommitted.jsonl",
  "b/two.check.audit.logs.part2.uncommitted.jsonl",
])

const existing = (at: string): boolean => THERE.has(at)

function rowAt(at: string): string {
  return JSON.stringify({ runId: "one", ranAt: at })
}

test("a page type is answered the windowed property it declares, through what it extends", () => {
  expect([...(sectionsOfType(READING).get("hook") ?? [])]).toEqual([["entries", HOURS]])
})

test("a property stating no window is no section, so a file under it is swept by nothing", () => {
  expect(sectionsOfType(READING).get("hook")?.has("lines")).toBe(false)
  expect(streamsIn(READING, existing).map((one) => one.section)).not.toContain("lines")
})

test("a property reached through a file property group is a section under the group's slug", () => {
  expect([...(sectionsOfType(READING).get("check") ?? [])].sort()).toEqual([
    ["audit.entries", HOURS],
    ["audit.logs", HOURS],
    ["entries", HOURS],
  ])
})

test("a page whose type states a window and whose file is there is one stream", () => {
  expect(streamsIn(READING, existing)).toContainEqual({
    page: HOOK,
    section: "entries",
    hours: HOURS,
  })
})

test("a stream whose first part has been rolled away is found by the part beside it", () => {
  expect(streamThere(CHECK, "audit.logs", existing)).toBe(true)
  expect(streamsIn(READING, existing)).toContainEqual({
    page: CHECK,
    section: "audit.logs",
    hours: HOURS,
  })
})

test("a page with no file beside it under a windowed property is no stream", () => {
  expect(streamThere(GROUP, "logs", existing)).toBe(false)
  expect(streamsIn(READING, existing).map((one) => one.page)).not.toContain(GROUP)
})

test("the streams are what the pages derive rather than every file a listing names", () => {
  expect(streamsIn(READING, existing).length).toBe(2)
})

test("a line that ran before the cutoff is dropped and one that ran after is kept", () => {
  const text = `${rowAt("2026-09-01T00:00:00.000Z")}\n${rowAt("2026-09-13T00:00:00.000Z")}\n`
  const held = keptFrom(text, Date.parse("2026-09-12T00:00:00.000Z"))
  expect(held.dropped).toBe(1)
  expect(held.kept).toBe(`${rowAt("2026-09-13T00:00:00.000Z")}\n`)
})

test("a line stating no instant this can read is kept", () => {
  const text = `${JSON.stringify({ runId: "one" })}\n${rowAt("2026-09-01T00:00:00.000Z")}\n`
  const held = keptFrom(text, Date.parse("2026-09-12T00:00:00.000Z"))
  expect(held.dropped).toBe(1)
  expect(held.kept).toBe(`${JSON.stringify({ runId: "one" })}\n`)
})

test("a line that will not read as json is kept", () => {
  const held = keptFrom("{not json\n", Date.parse("2026-09-12T00:00:00.000Z"))
  expect(held.dropped).toBe(0)
  expect(held.kept).toBe("{not json\n")
})

test("lines leaving nothing behind pack into no file at all", () => {
  expect(packed("", 100)).toEqual([])
})

test("lines past the ceiling pack into a part of their own", () => {
  const filling = packed("aaaa\nbbbb\ncccc\n", 10)
  expect(filling).toEqual(["aaaa\nbbbb\n", "cccc\n"])
})

test("lines within the ceiling pack into one part", () => {
  expect(packed("aaaa\nbbbb\n", 10)).toEqual(["aaaa\nbbbb\n"])
})

test("a line is measured by the bytes it takes rather than by the characters it spells", () => {
  expect(packed("ααα\nααα\n", 14)).toEqual(["ααα\nααα\n"])
  expect(packed("ααα\nααα\n", 13)).toEqual(["ααα\n", "ααα\n"])
})

test("a sweep that reached every stream reports what it dropped and says nothing of a stop", () => {
  expect(reportOf({ dropped: 12, swept: 3, streams: 9, busy: 1, reached: null })).toBe(
    "dropped 12 line(s) past the window from 3 of 9 stream(s); 1 whose turn did not come\n"
  )
})

test("a sweep told to stop says where it got to, so a partial run reads as no full sweep", () => {
  expect(reportOf({ dropped: 12, swept: 3, streams: 9, busy: 1, reached: 4 })).toBe(
    "told to stop at 4 of 9 stream(s), so lines past the window are still there — " +
      "dropped 12 line(s) past the window from 3 of 9 stream(s); 1 whose turn did not come\n"
  )
})
