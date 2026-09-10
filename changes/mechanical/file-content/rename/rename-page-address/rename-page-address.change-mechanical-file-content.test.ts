import { expect, test } from "bun:test"
import { pathsOf } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import {
  pathsIn,
  renamePageAddress,
} from "./rename-page-address.change-mechanical-file-content.code.ts"

const MOVED_TO = "akasha/held/one/held-one.held-other.code.ts"

const TAKEN = "akasha/held/one/held-one.held-checked.gone.ts"

test("a path the answer writes is read beside the paths the index lists", () => {
  const world = worldOf({ [CONST_AT]: CONST_BODY })
  const over: World = {
    ...world,
    over: { edits: [{ kind: "move", pathFrom: CONST_AT, pathTo: MOVED_TO }], refused: null },
  }

  expect(pathsIn(over)).toEqual([MOVED_TO])
})

test("a path the answer carries away is left out of the bodies read", () => {
  const world = worldOf({ [CONST_AT]: CONST_BODY, [TAKEN]: "held\n" })
  const over: World = {
    ...world,
    over: { edits: [{ kind: "remove", path: TAKEN }], refused: null },
  }

  expect(pathsIn(over)).toEqual([CONST_AT])
})

const WAS = ["held-kind", "held-one"].join("/")

const NOW = ["held-other", "held-one"].join("/")

const BESIDE = ["held-kind", "held-two"].join("/")

const CONST_AT = "akasha/held/one/held-one.held-checked.code.ts"

const CONST_BODY = `const HELD_ONE = "${WAS}"

export function held(): string {
  return HELD_ONE
}
`

const PAGE_AT = "akasha/held/held-kind.page-type.ts"

const PAGE_BODY = `export const heldKind = {
  partSlugs: ["${BESIDE}", "${WAS}"],
}
`

const CALL_AT = "akasha/held/one/held-one.held-checked.test.ts"

const CALL_BODY = `held(world, "${WAS}", {})\n`

const BARE_AT = "akasha/held/two/held-two.held-kind.ts"

const BARE_BODY = `export const heldTwo = {
  slug: "held-one",
}
`

const MADE_AT = "akasha/held/one/held-one.held-checked.addressed.ts"

const MADE_BODY = `export type Held = { "${WAS}": string }\n`

function worldOf(bodies: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: { everyPath: () => Object.keys(bodies) } as never,
    textOf: (path) => bodies[path] ?? null,
    bodyOf: (path) => bodies[path] ?? null,
    under: () => [],
    base: (path) => bodies[path] ?? null,
    over: NOTHING_OVER,
  }
}

function bodyOf(said: Answer, world: World, path: string): string {
  expect(said.refused).toBe(null)
  return bodiesIn(said, world.base).get(path) ?? ""
}

test("an address a top-level const holds is restated", () => {
  const world = worldOf({ [CONST_AT]: CONST_BODY })
  const said = renamePageAddress(world, { was: WAS, now: NOW })

  expect(bodyOf(said, world, CONST_AT)).toContain(`const HELD_ONE = "${NOW}"`)
})

test("an address stated among a page's parts is restated", () => {
  const world = worldOf({ [PAGE_AT]: PAGE_BODY })
  const said = renamePageAddress(world, { was: WAS, now: NOW })

  expect(bodyOf(said, world, PAGE_AT)).toContain(`["${BESIDE}", "${NOW}"]`)
})

test("an address handed to a call is restated", () => {
  const world = worldOf({ [CALL_AT]: CALL_BODY })
  const said = renamePageAddress(world, { was: WAS, now: NOW })

  expect(bodyOf(said, world, CALL_AT)).toBe(`held(world, "${NOW}", {})\n`)
})

test("every body spelling the address is answered at once", () => {
  const said = renamePageAddress(
    worldOf({ [CONST_AT]: CONST_BODY, [PAGE_AT]: PAGE_BODY, [CALL_AT]: CALL_BODY }),
    { was: WAS, now: NOW }
  )

  expect(said.edits.flatMap(pathsOf).sort()).toEqual([CALL_AT, CONST_AT, PAGE_AT].sort())
})

test("a body a machine writes is restated too", () => {
  const world = worldOf({ [MADE_AT]: MADE_BODY })
  const said = renamePageAddress(world, { was: WAS, now: NOW })

  expect(bodyOf(said, world, MADE_AT)).toBe(`export type Held = { "${NOW}": string }\n`)
})

test("a body spelling the slug without its page type is left as that body is", () => {
  const said = renamePageAddress(worldOf({ [BARE_AT]: BARE_BODY }), { was: WAS, now: NOW })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a body spelling the address nowhere is answered with no edit", () => {
  const said = renamePageAddress(worldOf({ [CALL_AT]: `held(world, "other/thing", {})\n` }), {
    was: WAS,
    now: NOW,
  })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("an address stating no page type is refused", () => {
  const said = renamePageAddress(worldOf({}), { was: "held-one", now: NOW })

  expect(said.refused).toContain("is no address")
})

test("the address a page already carries is refused", () => {
  const said = renamePageAddress(worldOf({}), { was: WAS, now: WAS })

  expect(said.refused).toContain("already carries")
})

const SCOPED_WAS = ["held-kind", "held-scope", "held-one"].join("/")

const SCOPED_NOW = ["held-kind", "held-scope", "held-other"].join("/")

const SCOPED_AT = "akasha/held/three/held-three.held-kind.ts"

const SCOPED_BODY = `export const heldThree = {
  partOfCollections: ["${SCOPED_WAS}"],
}
`

test("an address naming a scope between the page type and the slug is restated", () => {
  const world = worldOf({ [SCOPED_AT]: SCOPED_BODY })
  const said = renamePageAddress(world, { was: SCOPED_WAS, now: SCOPED_NOW })

  expect(bodyOf(said, world, SCOPED_AT)).toContain(`["${SCOPED_NOW}"]`)
})

test("an address naming no scope leaves a body spelling a scoped address alone", () => {
  const said = renamePageAddress(worldOf({ [SCOPED_AT]: SCOPED_BODY }), { was: WAS, now: NOW })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a name with more parts than a page type, a scope and a slug is refused", () => {
  const said = renamePageAddress(worldOf({}), { was: `${SCOPED_WAS}/held-more`, now: SCOPED_NOW })

  expect(said.refused).toContain("is no address")
})
