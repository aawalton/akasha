import { expect, test } from "bun:test"
import {
  openingsIn,
  restatedIn,
  restatedOver,
} from "akasha/changes/modules/address-restating/address-restating.module.code.ts"
import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

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
  const said = restatedIn(worldOf({ [PAGE_AT]: PAGE_BODY, [OTHER_AT]: OTHER_BODY }), MOVED)

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
  const world = worldOf({ [CALL_AT]: CALL_BODY })
  const said = restatedIn(world, ONE)

  expect(bodyAnswered(said, world, CALL_AT)).toBe(`held(world, "${ONE_NOW}", {})\n`)
})

test("a body a machine writes is restated too", () => {
  const world = worldOf({ [MADE_AT]: MADE_BODY })
  const said = restatedIn(world, ONE)

  expect(bodyAnswered(said, world, MADE_AT)).toBe(`export type Held = { "${ONE_NOW}": string }\n`)
})

test("a body spelling the slug without its page type is left as that body is", () => {
  const said = restatedIn(worldOf({ [BARE_AT]: BARE_BODY }), ONE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("an address naming a scope between the page type and the slug is restated", () => {
  const world = worldOf({ [SCOPED_AT]: SCOPED_BODY })
  const said = restatedIn(world, new Map([[SCOPED_WAS, SCOPED_NOW]]))

  expect(bodyAnswered(said, world, SCOPED_AT)).toContain(`["${SCOPED_NOW}"]`)
})

test("an address naming no scope leaves a body spelling a scoped address alone", () => {
  const said = restatedIn(worldOf({ [SCOPED_AT]: SCOPED_BODY }), ONE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a name with more parts than a page type, a scope and a slug is refused", () => {
  const said = restatedIn(worldOf({}), new Map([[`${SCOPED_WAS}/held-more`, SCOPED_NOW]]))

  expect(said.refused).toContain("is no address")
})
