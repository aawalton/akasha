import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { lines } from "akasha/agent/seat/log-day/properties/lines.file-property.ts"
import { logs } from "akasha/code/module-property-group/properties/logs.file-property.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { graphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.ts"
import { property } from "akasha/graph/attribute/pages/property.graph-attribute.ts"
import { graphEdge } from "akasha/graph/edge/graph-edge.page-type.ts"
import { relation } from "akasha/graph/edge/pages/relation.graph-edge.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
import { filePropertyGroup } from "akasha/page/file-property-group/file-property-group.page-type.ts"
import {
  bodyOf,
  graphedRepo,
  type Named,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  keptFrom,
  packed,
  reportOf,
  sectionsOfType,
  streamsIn,
  streamThere,
  sweptStream,
} from "akasha/page/modules/record-sweeping/record-sweeping.module.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { entries } from "akasha/page/properties/entries.file-property.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type Held = Record<string, unknown>

const TREE = "akasha"

const HOURS = 24

const HOOK = `${TREE}/a/one.hook.ts`

const CHECK = `${TREE}/b/two.check.ts`

const GROUP = `${TREE}/c/audit.held-group.ts`

const TYPE_AT = `${pageType.slug}/${pageType.slug}` as const

const LOGGED_AT = `${pageType.slug}/logged` as const

const FILE_PROPERTY_GROUP_AT = `${pageType.slug}/${filePropertyGroup.slug}` as const

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const ENTRIES_AT = `${fileProperty.slug}/${entries.slug}` as const

const LINES_AT = `${fileProperty.slug}/${lines.slug}` as const

const LOGS_AT = `${fileProperty.slug}/${logs.slug}` as const

const heldId = (one: string): string => `01a04a4a-0011-7000-8000-00000000000${one}`

const aType = (
  one: string,
  slug: string,
  above: readonly string[],
  properties: readonly Held[]
): Named =>
  thePage({
    id: heldId(one),
    type: TYPE_AT,
    slug,
    definition: "a page type a test invented",
    extends: above,
    properties,
  })

const aProperty = (one: string, slug: string, hours: number | null): Named =>
  thePage({
    id: heldId(one),
    type: `${pageType.slug}/${fileProperty.slug}`,
    slug,
    propertySlug: slug,
    definition: "a file property a test invented",
    ...(hours === null ? {} : { keptForHours: hours }),
  })

const aPage = (one: string, at: string, pageTypeSlug: string, slug: string): Named => [
  at,
  { id: heldId(one), type: `${pageType.slug}/${pageTypeSlug}`, slug },
]

const TYPES: readonly Named[] = [
  thePage({
    id: heldId("1"),
    type: `${pageType.slug}/${graphAttribute.slug}`,
    slug: property.slug,
    definition: property.definition,
  }),
  thePage({
    id: heldId("2"),
    type: `${pageType.slug}/${graphEdge.slug}`,
    slug: relation.slug,
    definition: relation.definition,
    attributes: [`${graphAttribute.slug}/${property.slug}`],
  }),
  aType("3", "logged", [PAGE_AT], [{ pageProperty: ENTRIES_AT }, { pageProperty: LINES_AT }]),
  aType("4", filePropertyGroup.slug, [PAGE_PROPERTY_AT], []),
  aType("5", "held-group", [FILE_PROPERTY_GROUP_AT, LOGGED_AT], [{ pageProperty: LOGS_AT }]),
  aType("6", "hook", [LOGGED_AT], []),
  aType("7", "check", [LOGGED_AT], [{ pageProperty: "held-group/audit" }]),
  aProperty("8", entries.slug, HOURS),
  aProperty("9", logs.slug, HOURS),
  aProperty("a", lines.slug, null),
]

const PAGES: readonly Named[] = [
  aPage("b", HOOK, "hook", "one"),
  aPage("c", CHECK, "check", "two"),
  aPage("d", GROUP, "held-group", "audit"),
]

const REPO = graphedRepo(
  Object.fromEntries([
    ...TYPES.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)] as const),
    ...PAGES.map(([at, value]) => [at, bodyOf(value)] as const),
  ])
)

const THERE: ReadonlySet<string> = new Set([
  `${TREE}/a/one.hook.entries.uncommitted.jsonl`,
  `${TREE}/a/one.hook.lines.uncommitted.jsonl`,
  `${TREE}/b/two.check.audit.logs.part2.uncommitted.jsonl`,
])

const existing = (at: string): boolean => THERE.has(at)

function rowAt(at: string): string {
  return JSON.stringify({ runId: "one", ranAt: at })
}

test("a page type is answered the windowed property it declares, through what it extends", () => {
  expect([...(sectionsOfType(REPO).get("hook") ?? [])]).toEqual([["entries", HOURS]])
})

test("a property stating no window is no section, so a file under it is swept by nothing", () => {
  expect(sectionsOfType(REPO).get("hook")?.has("lines")).toBe(false)
  expect(streamsIn(REPO, existing).map((one) => one.section)).not.toContain("lines")
})

test("a property reached through a file property group is a section under the group's slug", () => {
  expect([...(sectionsOfType(REPO).get("check") ?? [])].sort()).toEqual([
    ["audit.entries", HOURS],
    ["audit.logs", HOURS],
    ["entries", HOURS],
  ])
})

test("a page whose type states a window and whose file is there is one stream", () => {
  expect(streamsIn(REPO, existing)).toContainEqual({
    page: HOOK,
    section: "entries",
    hours: HOURS,
  })
})

test("a stream whose first part has been rolled away is found by the part beside it", () => {
  expect(streamThere(CHECK, "audit.logs", existing)).toBe(true)
  expect(streamsIn(REPO, existing)).toContainEqual({
    page: CHECK,
    section: "audit.logs",
    hours: HOURS,
  })
})

test("a page with no file beside it under a windowed property is no stream", () => {
  expect(streamThere(GROUP, "logs", existing)).toBe(false)
  expect(streamsIn(REPO, existing).map((one) => one.page)).not.toContain(GROUP)
})

test("the streams are what the pages derive rather than every file a listing names", () => {
  expect(streamsIn(REPO, existing).length).toBe(2)
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a stream whose first part alone is gone is swept and written again from the first part", () => {
  const root = scratch.rootFor("akasha-record-sweeping-")
  mkdirSync(join(root, TREE, "a"), { recursive: true })
  const second = join(root, TREE, "a/one.hook.entries.part2.uncommitted.jsonl")
  const kept = rowAt("2026-09-13T00:00:00.000Z")
  writeFileSync(second, `${rowAt("2026-09-01T00:00:00.000Z")}\n${kept}\n`)
  const stream = { page: HOOK, section: "entries", hours: HOURS }
  expect(sweptStream(root, stream, Date.parse("2026-09-13T12:00:00.000Z"))).toBe(1)
  const first = join(root, TREE, "a/one.hook.entries.uncommitted.jsonl")
  expect(readFileSync(first, "utf8")).toBe(`${kept}\n`)
  expect(existsSync(second)).toBe(false)
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
