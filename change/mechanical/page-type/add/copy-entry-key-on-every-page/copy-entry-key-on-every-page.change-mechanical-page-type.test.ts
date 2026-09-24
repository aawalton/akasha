import { expect, test } from "bun:test"
import {
  type Asked,
  copyEntryKeyOnEveryPage,
} from "akasha/change/mechanical/page-type/add/copy-entry-key-on-every-page/copy-entry-key-on-every-page.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const TYPE = "week"

const ONE_AT = "alan/weeks/one.week.ts"

const TWO_AT = "alan/weeks/two.week.ts"

const ONE_ROWS_AT = "alan/weeks/one.week.spans.jsonl"

const TWO_ROWS_AT = "alan/weeks/two.week.spans.jsonl"

const PART_TWO_AT = "alan/weeks/one.week.spans.part2.jsonl"

const ASKED: Asked = { pageType: TYPE, key: "spans", from: "opened", to: "openedAt" }

const ENTRY: Declared = {
  pagePropertySlug: "page-property-entry/week-spans",
  pageTypeSlug: "page-property-entry",
  propertySlug: "spans",
  key: "spans",
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: true,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const WEEKS: ReadonlyMap<string, Value> = new Map([
  [ONE_AT, { spans: "jsonl" }],
  [TWO_AT, { spans: "jsonl" }],
])

function bodyOf(slug: string): string {
  return `export const ${slug} = {\n  slug: "${slug}",\n  spans: "jsonl",\n}\n`
}

function worldFor(files: Readonly<Record<string, string>>): World {
  const index = {
    kindsUnder: (of: string) => new Set([of]),
    propertiesIfNamed: (of: string) => (of === TYPE ? [ENTRY] : null),
    valuesByPath: () => WEEKS,
  } as never
  const bodies = { [ONE_AT]: bodyOf("one"), [TWO_AT]: bodyOf("two"), ...files }
  const ledger = ledgerAt("/nowhere", filesOf(bodies))
  return Object.defineProperty(ledger, "index", { value: index })
}

test("the key written to is put in straight after the key read from, which stays", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"id":"a","opened":"x","note":"n"}\n{"id":"b"}\n' })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(
    '{"id":"a","opened":"x","openedAt":"x","note":"n"}\n{"id":"b"}\n'
  )
})

test("a key read from that closes its entry is copied before the entry closes", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"id":"a","opened":"x"}\n' })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(
    '{"id":"a","opened":"x","openedAt":"x"}\n'
  )
})

test("every part of the file beside the page is written", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x"}\n',
    [PART_TWO_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_ROWS_AT) ?? "").toContain('"openedAt":"x"')
  expect(bodies.get(PART_TWO_AT) ?? "").toContain('"openedAt":"y"')
})

test("an entry already stating the same value under both keys is passed over", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x","openedAt":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([TWO_ROWS_AT])
})

test("an entry stating two values under the two keys refuses the whole change", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"y"}\n',
    [TWO_ROWS_AT]: '{"opened":"x","openedAt":"z"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_ROWS_AT)
})

test("a count handed in holds how many pages one run writes", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect([...new Set(pathsIn(said))]).toEqual([ONE_ROWS_AT])
})

test("a page already written is not counted, so the next run reaches the next page", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: '{"opened":"x","openedAt":"x"}\n',
    [TWO_ROWS_AT]: '{"opened":"y"}\n',
  })

  const said = copyEntryKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect([...new Set(pathsIn(said))]).toEqual([TWO_ROWS_AT])
})

test("a page type no entry of which needs the key written is answered as no edit", () => {
  const world = worldFor({ [ONE_ROWS_AT]: '{"id":"a"}\n' })

  const said = copyEntryKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
  expect(said.told).toEqual(["no entry under `spans` states `opened` without `openedAt`"])
})

test("a key keeping no entries beside the page is refused", () => {
  const said = copyEntryKeyOnEveryPage(worldFor({}), { ...ASKED, key: "heldBy" })

  expect(said.refused).toBe("a `week` has no property under `heldBy`")
})

test("a page type the index does not name is refused", () => {
  const said = copyEntryKeyOnEveryPage(worldFor({}), { ...ASKED, pageType: "month" })

  expect(said.refused).toBe("`month` names no page type")
})
