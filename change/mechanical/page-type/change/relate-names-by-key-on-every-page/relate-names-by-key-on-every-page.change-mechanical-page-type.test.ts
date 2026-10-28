import { expect, test } from "bun:test"
import {
  type Asked,
  relateNamesByKeyOnEveryPage,
} from "akasha/change/mechanical/page-type/change/relate-names-by-key-on-every-page/relate-names-by-key-on-every-page.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TYPE = "show"

const TARGET = "streaming-service"

const ONE_AT = "alan/show/one.show.ts"

const TWO_AT = "alan/show/two.show.ts"

const NETFLIX = "streaming-service/netflix"

const HULU = "streaming-service/hulu"

const ASKED: Asked = { pageType: TYPE, key: "streamingOn", target: TARGET, by: "providerNames" }

const SERVICES: ReadonlyMap<string, Value> = new Map([
  [
    "alan/service/netflix.streaming-service.ts",
    { slug: "netflix", providerNames: ["Netflix", "Netflix Standard with Ads"] },
  ],
  ["alan/service/hulu.streaming-service.ts", { slug: "hulu", providerNames: "Hulu" }],
])

type Held = Readonly<Record<string, readonly string[] | string>>

function bodyOf(slug: string, held: readonly string[] | string): string {
  return `export const ${slug} = {\n  slug: "${slug}",\n  streamingOn: ${JSON.stringify(held)},\n} as const\n`
}

function worldFor(held: Held, services: ReadonlyMap<string, Value> = SERVICES): World {
  const shows = new Map<string, Value>(
    Object.entries(held).map(([at, names]) => [at, { streamingOn: names }])
  )
  const index = {
    kindsUnder: (of: string) => new Set([of]),
    propertiesIfNamed: (of: string) => (of === TYPE || of === TARGET ? [] : null),
    valuesByPath: (kind: string) => (kind === TYPE ? shows : services),
  } as never
  const bodies = Object.fromEntries(
    Object.entries(held).map(([at, names]) => [at, bodyOf(at === ONE_AT ? "one" : "two", names)])
  )
  const ledger = ledgerAt("/nowhere", filesOf(bodies))
  return Object.defineProperty(ledger, "index", { value: index })
}

test("names reaching one page are written as that page once, in the order they sort in", () => {
  const world = worldFor({ [ONE_AT]: ["Netflix", "Netflix Standard with Ads", "Hulu"] })

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `streamingOn: ["${HULU}", "${NETFLIX}"],`
  )
})

test("a name is looked up with the space around it trimmed", () => {
  const world = worldFor({ [ONE_AT]: ["Hulu "] })

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`streamingOn: ["${HULU}"],`)
})

test("an address already held is kept, and a page coming out as it is is passed over", () => {
  const world = worldFor({ [ONE_AT]: [NETFLIX, "Hulu"], [TWO_AT]: [NETFLIX] })

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`["${HULU}", "${NETFLIX}"]`)
})

test("a single name stated outside a list is written as its page", () => {
  const world = worldFor({ [ONE_AT]: "Netflix Standard with Ads" })

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`streamingOn: "${NETFLIX}",`)
})

test("every name no target page states is named once in one refusal, with a page holding it", () => {
  const world = worldFor({
    [ONE_AT]: ["Tubi TV", "Pluto TV", "Hulu"],
    [TWO_AT]: ["Pluto TV"],
  })

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `no \`${TARGET}\` states under \`providerNames\` the names \`Pluto TV\` (on \`${ONE_AT}\`), \`Tubi TV\` (on \`${ONE_AT}\`)`
  )
})

test("a name two target pages state refuses the whole change", () => {
  const twice = new Map([
    ...SERVICES,
    ["alan/service/more.streaming-service.ts", { slug: "more", providerNames: ["Hulu"] }],
  ])
  const world = worldFor({ [ONE_AT]: ["Hulu"] }, twice)

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names both")
})

test("a count handed in holds how many pages one run writes", () => {
  const world = worldFor({ [ONE_AT]: ["Hulu"], [TWO_AT]: ["Netflix"] })

  const said = relateNamesByKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("a page type no page of which holds a name to write is answered as no edit", () => {
  const world = worldFor({ [ONE_AT]: [HULU] })

  const said = relateNamesByKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
  expect(said.told).toEqual([
    "no `show` holds a name under `streamingOn` that is not written as its page",
  ])
})

test("a target the index does not name is refused", () => {
  const world = worldFor({ [ONE_AT]: ["Hulu"] })

  const said = relateNamesByKeyOnEveryPage(world, { ...ASKED, target: "shelf" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`shelf` names no page type")
})
