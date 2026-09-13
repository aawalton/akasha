import { expect, test } from "bun:test"
import {
  movePropertiesIntoARecordOnEveryPage,
  recordSpelledAs,
  runChange,
} from "akasha/changes/agent/page-type/move-properties-into-a-record-on-every-page/move-properties-into-a-record-on-every-page.change-agent.code.ts"
import { runChange as addRecord } from "akasha/changes/mechanical/file-content/add/add-property-record/add-property-record.change-mechanical-file-content.code.ts"
import { runChange as removeKey } from "akasha/changes/mechanical/file-content/remove/remove-page-property/remove-page-property.change-mechanical-file-content.code.ts"
import { refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import type { Carried } from "akasha/pages/types/modules/declared-properties/declared-properties.module.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/add-property-record") {
    return Promise.resolve(addRecord(world, given as Parameters<typeof addRecord>[1]))
  }
  if (at === "change-mechanical-file-content/remove-page-property") {
    return Promise.resolve(removeKey(world, given as Parameters<typeof removeKey>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ONE_AT = "thrumming/releases/pages/one.release.ts"

const TWO_AT = "thrumming/releases/pages/two.release.ts"

function bodied(slug: string, held: string): string {
  return `import type { Release } from "../release.page-type.ts"

export const ${slug} = {
  slug: "${slug}",
  externalId: "${held}",
  source: "spotify",
  position: 1,
} as const satisfies Release
`
}

const BODIES = {
  [ONE_AT]: bodied("one", "a1"),
  [TWO_AT]: bodied("two", "b2"),
}

type Values = ReadonlyMap<string, Readonly<Record<string, unknown>>>

const VALUES: Values = new Map([
  [ONE_AT, { slug: "one", externalId: "a1", source: "spotify" }],
  [TWO_AT, { slug: "two", externalId: "b2", source: "spotify" }],
])

const EXTERNAL_ID: Carried = {
  pagePropertySlug: "external-id",
  pageTypeSlug: "text-property",
  propertySlug: "external-id",
  key: "externalId",
  unique: null,
  declaredBy: "release",
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const SOURCE: Carried = {
  ...EXTERNAL_ID,
  pagePropertySlug: "source",
  pageTypeSlug: "select-property",
  propertySlug: "source",
  key: "source",
}

const HELD_BY: Carried = {
  ...EXTERNAL_ID,
  pagePropertySlug: "external-identity",
  pageTypeSlug: "record-property",
  propertySlug: "external-identity",
  key: "externalIdentity",
  many: true,
}

const DECLARED = [EXTERNAL_ID, SOURCE, HELD_BY]

const GATHERING = {
  pageType: "release",
  keys: ["source", "externalId"],
  needs: ["source", "externalId"],
  also: {},
  to: "externalIdentity",
}

const WITHOUT_SOURCE = {
  ...GATHERING,
  keys: ["externalId"],
  needs: ["externalId"],
  also: { source: "spotify" },
}

const RECORD = `externalIdentity: [{ source: "spotify", externalId: "a1" }]`

function pagesIn(
  bodies: Readonly<Record<string, string>>,
  carried: readonly Carried[] | null,
  values: Values = VALUES
): World {
  return worldOfType(GATHERING.pageType, bodies, carried, values, RUNS)
}

test("the keys are written as one record under the key written to", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertiesIntoARecordOnEveryPage(world, GATHERING)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(RECORD)
  expect(bodies.get(TWO_AT) ?? "").toContain(`{ source: "spotify", externalId: "b2" }`)
})

test("every key gathered from a page is taken off that page", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertiesIntoARecordOnEveryPage(world, GATHERING)

  const body = bodiesIn(said, world.base).get(ONE_AT) ?? ""
  expect(body).not.toMatch(/\n {2}externalId:/)
  expect(body).not.toMatch(/\n {2}source:/)
})

test("the record is put in after the first key gathered from that page", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertiesIntoARecordOnEveryPage(world, GATHERING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `slug: "one",\n  ${RECORD},\n  position: 1,`
  )
})

test("the record spells its fields in the order the keys are handed in", () => {
  expect(recordSpelledAs({ externalId: "a1", source: "spotify" }, ["source", "externalId"])).toBe(
    `{ source: "spotify", externalId: "a1" }`
  )
})

test("a key the page states no value under is left out of the record", () => {
  expect(recordSpelledAs({ source: "spotify" }, ["source"])).toBe(`{ source: "spotify" }`)
})

test("a field handed in is written into the record before the keys gathered", async () => {
  const values: Values = new Map([[ONE_AT, { slug: "one", externalId: "a1" }]])
  const world = pagesIn(BODIES, DECLARED, values)

  const said = await movePropertiesIntoARecordOnEveryPage(world, WITHOUT_SOURCE)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(RECORD)
})

test("a page already stating a field handed in is passed over rather than refused", async () => {
  const said = await movePropertiesIntoARecordOnEveryPage(pagesIn(BODIES, DECLARED), WITHOUT_SOURCE)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a field handed in under no property of that page type is refused", async () => {
  const said = await movePropertiesIntoARecordOnEveryPage(pagesIn(BODIES, [EXTERNAL_ID, HELD_BY]), {
    ...WITHOUT_SOURCE,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `source`")
})

test("text stating no field is refused", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), {
    "page-type": "release",
    keys: "externalId",
    also: "spotify",
    to: "externalIdentity",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("states no field")
})

test("a page missing a key named as needed is passed over rather than refused", async () => {
  const values: Values = new Map([[ONE_AT, { slug: "one", source: "royal-road" }]])

  const said = await movePropertiesIntoARecordOnEveryPage(
    pagesIn(BODIES, DECLARED, values),
    GATHERING
  )

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page stating none of the keys is passed over rather than refused", async () => {
  const values: Values = new Map([[ONE_AT, { slug: "one" }]])

  const said = await movePropertiesIntoARecordOnEveryPage(pagesIn(BODIES, DECLARED, values), {
    ...GATHERING,
    needs: [],
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page already with the key written to is passed over rather than refused", async () => {
  const values: Values = new Map([
    [ONE_AT, { slug: "one", externalId: "a1", source: "spotify", externalIdentity: [] }],
  ])

  const said = await movePropertiesIntoARecordOnEveryPage(
    pagesIn(BODIES, DECLARED, values),
    GATHERING
  )

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a count handed in holds how many pages the record is written on", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertiesIntoARecordOnEveryPage(world, { ...GATHERING, atMost: 1 })

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(RECORD)
  expect(bodies.has(TWO_AT)).toBe(false)
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), {
    "page-type": "release",
    keys: "source,externalId",
    to: "externalIdentity",
    "at-most": "none",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no count of pages")
})

test("a key named as needed and not gathered is refused", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), {
    "page-type": "release",
    keys: "source",
    needs: "externalId",
    to: "externalIdentity",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`externalId` is needed and is no key gathered here")
})

test("a page type with no property under the key written to is refused", async () => {
  const said = await movePropertiesIntoARecordOnEveryPage(
    pagesIn(BODIES, [EXTERNAL_ID, SOURCE]),
    GATHERING
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `externalIdentity`")
})

test("a page type holding one value under the key written to is refused", async () => {
  const one = { ...HELD_BY, many: false }

  const said = await movePropertiesIntoARecordOnEveryPage(
    pagesIn(BODIES, [EXTERNAL_ID, SOURCE, one]),
    GATHERING
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds one `externalIdentity`")
})

test("a page type with no property under one of the keys is refused", async () => {
  const said = await movePropertiesIntoARecordOnEveryPage(
    pagesIn(BODIES, [EXTERNAL_ID, HELD_BY]),
    GATHERING
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `source`")
})

test("a page type the index does not name is refused", async () => {
  const said = await movePropertiesIntoARecordOnEveryPage(pagesIn(BODIES, null), GATHERING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`release` names no page type")
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const held = { ...BODIES, [TWO_AT]: "const two = 1\n" }

  const said = await movePropertiesIntoARecordOnEveryPage(pagesIn(held, DECLARED), GATHERING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), { keys: "source" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
