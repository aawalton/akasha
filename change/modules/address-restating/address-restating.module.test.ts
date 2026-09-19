import { expect, test } from "bun:test"
import {
  openingsIn,
  restatedIn,
  restatedOver,
} from "akasha/change/modules/address-restating/address-restating.module.code.ts"
import { pathsOf } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  put,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

function worldSpelling(
  held: Readonly<Record<string, string>>,
  over: Answer = NOTHING_OVER,
  wrote: Readonly<Record<string, string>> = held
): World {
  const root = scratch.rootFor("address-restating-")
  for (const [at, body] of Object.entries(wrote)) put(root, at, body)
  return { ...worldOf(held), root, over }
}

const ONE_WAS = ["held-kind", "held-one"].join("/")

const ONE_NOW = ["held-other", "held-one"].join("/")

const TWO_WAS = ["held-kind", "held-two"].join("/")

const TWO_NOW = ["held-other", "held-two"].join("/")

const MOVED = new Map([
  [ONE_WAS, ONE_NOW],
  [TWO_WAS, TWO_NOW],
])

const PAGE_AT = "akasha/held/held-kind.page-type.ts"

const PAGE_BODY = `export const heldKind = {
  partSlugs: ["${ONE_WAS}", "${TWO_WAS}"],
}
`

const OTHER_AT = "akasha/held/one/held-one.held-kind.code.ts"

const OTHER_BODY = `const HELD = "other/thing"\n`

const PROSE_AT = "akasha/held/one/held-one.held-kind.prose.md"

const PROSE_BODY = `the address ${ONE_WAS} is named here\n`

const TEXTS: Readonly<Record<string, string>> = {
  [PAGE_AT]: PAGE_BODY,
  [OTHER_AT]: OTHER_BODY,
  [PROSE_AT]: PROSE_BODY,
}

function textOf(path: string): string | null {
  return TEXTS[path] ?? null
}

test("every address handed in is restated over one reading of the bodies", () => {
  expect(restatedOver([PAGE_AT], textOf, MOVED)).toEqual([
    {
      kind: "replace",
      path: PAGE_AT,
      contentFrom: `  partSlugs: ["${ONE_WAS}", "${TWO_WAS}"],`,
      contentTo: `  partSlugs: ["${ONE_NOW}", "${TWO_NOW}"],`,
    },
  ])
})

test("a body spelling no address handed in is read and left alone", () => {
  expect(restatedOver([OTHER_AT], textOf, MOVED)).toEqual([])
})

test("a body holding no typed code is left unread", () => {
  expect(restatedOver([PROSE_AT], textOf, MOVED)).toEqual([])
})

test("a path holding no body at all is left alone", () => {
  expect(restatedOver(["akasha/held/one/held-one.held-kind.code.ts.gone"], textOf, MOVED)).toEqual(
    []
  )
})

test("the page type of each address is what a body is parsed for", () => {
  expect(openingsIn(MOVED)).toEqual(["held-kind/"])
})

test("the bodies read are the paths the world holds", () => {
  const said = restatedIn(worldSpelling({ [PAGE_AT]: PAGE_BODY, [OTHER_AT]: OTHER_BODY }), MOVED)

  expect(said.refused).toBe(null)
  expect(said.edits.flatMap(pathsOf)).toEqual([PAGE_AT])
})

test("an address handed in that is no address refuses the whole answer", () => {
  const said = restatedIn(worldOf({}), new Map([["held-one", ONE_NOW]]))

  expect(said.refused).toContain("is no address")
})

test("an address handed in as its own new address refuses the whole answer", () => {
  const said = restatedIn(worldOf({}), new Map([[ONE_WAS, ONE_WAS]]))

  expect(said.refused).toContain("already carries")
})

test("a call handing in no address at all is refused", () => {
  const said = restatedIn(worldOf({}), new Map())

  expect(said.refused).toContain("no address was handed in")
})

const ONE = new Map([[ONE_WAS, ONE_NOW]])

const CALL_AT = "akasha/held/one/held-one.held-checked.test.ts"

const CALL_BODY = `held(world, "${ONE_WAS}", {})\n`

const MADE_AT = "akasha/held/one/held-one.held-checked.addressed.ts"

const MADE_BODY = `export type Held = { "${ONE_WAS}": string }\n`

const BARE_AT = "akasha/held/two/held-two.held-kind.ts"

const BARE_BODY = `export const heldTwo = {
  slug: "held-one",
}
`

const SCOPED_WAS = ["held-kind", "held-scope", "held-one"].join("/")

const SCOPED_NOW = ["held-kind", "held-scope", "held-other"].join("/")

const SCOPED_AT = "akasha/held/three/held-three.held-kind.ts"

const SCOPED_BODY = `export const heldThree = {
  partOfCollections: ["${SCOPED_WAS}"],
}
`

test("an address handed to a call is restated", () => {
  const world = worldSpelling({ [CALL_AT]: CALL_BODY })
  const said = restatedIn(world, ONE)

  expect(bodyAnswered(said, world, CALL_AT)).toBe(`held(world, "${ONE_NOW}", {})\n`)
})

test("a body a machine writes is restated too", () => {
  const world = worldSpelling({ [MADE_AT]: MADE_BODY })
  const said = restatedIn(world, ONE)

  expect(bodyAnswered(said, world, MADE_AT)).toBe(`export type Held = { "${ONE_NOW}": string }\n`)
})

test("a body spelling the slug without its page type is left as that body is", () => {
  const said = restatedIn(worldSpelling({ [BARE_AT]: BARE_BODY }), ONE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("an address naming a scope between the page type and the slug is restated", () => {
  const world = worldSpelling({ [SCOPED_AT]: SCOPED_BODY })
  const said = restatedIn(world, new Map([[SCOPED_WAS, SCOPED_NOW]]))

  expect(bodyAnswered(said, world, SCOPED_AT)).toContain(`["${SCOPED_NOW}"]`)
})

test("an address naming no scope leaves a body spelling a scoped address alone", () => {
  const said = restatedIn(worldSpelling({ [SCOPED_AT]: SCOPED_BODY }), ONE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a name with more parts than a page type, a scope and a slug is refused", () => {
  const said = restatedIn(worldOf({}), new Map([[`${SCOPED_WAS}/held-more`, SCOPED_NOW]]))

  expect(said.refused).toContain("is no address")
})

const WRITTEN_AT = "akasha/held/four/held-four.held-kind.code.ts"

const WRITTEN_WAS = `const HELD = "other/thing"\n`

const WRITTEN_NOW = `const HELD = "${ONE_WAS}"\n`

test("the bodies read are the ones a search of the tree names", () => {
  const world = worldSpelling({ [PAGE_AT]: PAGE_BODY }, NOTHING_OVER, { [OTHER_AT]: OTHER_BODY })
  const said = restatedIn(world, MOVED)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a path the answer writes is read beside the paths the index lists", () => {
  const over: Answer = {
    edits: [
      { kind: "replace", path: WRITTEN_AT, contentFrom: WRITTEN_WAS, contentTo: WRITTEN_NOW },
    ],
    refused: null,
  }
  const world = worldSpelling({ [WRITTEN_AT]: WRITTEN_NOW }, over, { [WRITTEN_AT]: WRITTEN_WAS })
  const said = restatedIn(world, ONE)

  expect(bodyAnswered(said, world, WRITTEN_AT)).toBe(`const HELD = "${ONE_NOW}"\n`)
})

test("a tree that could not be searched refuses rather than restating nothing", () => {
  const said = restatedIn(worldOf({ [PAGE_AT]: PAGE_BODY }), MOVED)

  expect(said.refused).toContain("so no address was restated")
})
