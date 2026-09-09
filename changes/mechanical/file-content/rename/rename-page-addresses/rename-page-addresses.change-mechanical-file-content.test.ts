import { expect, test } from "bun:test"
import { pathsOf } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import {
  openingsIn,
  pathsOver,
  renamePageAddresses,
} from "./rename-page-addresses.change-mechanical-file-content.code.ts"

const ONE_WAS = ["held-kind", "held-one"].join("/")

const ONE_NOW = ["held-other", "held-one"].join("/")

const TWO_WAS = ["held-kind", "held-two"].join("/")

const TWO_NOW = ["held-other", "held-two"].join("/")

const MOVED = { [ONE_WAS]: ONE_NOW, [TWO_WAS]: TWO_NOW }

const PAGE_AT = "akasha/held/held-kind.page-type.ts"

const PAGE_BODY = `export const heldKind = {
  partSlugs: ["${ONE_WAS}", "${TWO_WAS}"],
}
`

const CONST_AT = "akasha/held/one/held-one.held-checked.code.ts"

const CONST_BODY = `const HELD_ONE = "${ONE_WAS}"\n`

const ANCHOR_AT = "akasha/held/times/held-times.module.code.ts"

const ANCHOR_BODY = `export const TIMES = ["now", "held-kind", "held-one"] as const\n`

const MOVED_TO = "akasha/held/one/held-one.held-other.code.ts"

const TAKEN = "akasha/held/one/held-one.held-checked.gone.ts"

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

test("every address handed in is restated over one reading of the bodies", () => {
  const world = worldOf({ [PAGE_AT]: PAGE_BODY, [CONST_AT]: CONST_BODY })
  const said = renamePageAddresses(world, { moved: MOVED })

  expect(bodyOf(said, world, PAGE_AT)).toContain(`["${ONE_NOW}", "${TWO_NOW}"]`)
  expect(bodyOf(said, world, CONST_AT)).toContain(`"${ONE_NOW}"`)
  expect(said.edits.flatMap(pathsOf).sort()).toEqual([CONST_AT, PAGE_AT].sort())
})

test("a page type named among query time anchors is left as that anchor is", () => {
  const said = renamePageAddresses(worldOf({ [ANCHOR_AT]: ANCHOR_BODY }), { moved: MOVED })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a body spelling no address handed in is read and left alone", () => {
  const said = renamePageAddresses(worldOf({ [CONST_AT]: `const HELD = "other/thing"\n` }), {
    moved: MOVED,
  })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("the page type of each address is what a body is parsed for", () => {
  expect(openingsIn(new Map(Object.entries(MOVED)))).toEqual(["held-kind/"])
})

test("a path the answer writes is read beside the paths the index lists", () => {
  const world = worldOf({ [CONST_AT]: CONST_BODY })
  const over: World = {
    ...world,
    over: { edits: [{ kind: "move", pathFrom: CONST_AT, pathTo: MOVED_TO }], refused: null },
  }

  expect(pathsOver(over)).toEqual([MOVED_TO])
})

test("a path the answer carries away is left out of the bodies read", () => {
  const world = worldOf({ [CONST_AT]: CONST_BODY, [TAKEN]: "held\n" })
  const over: World = {
    ...world,
    over: { edits: [{ kind: "remove", path: TAKEN }], refused: null },
  }

  expect(pathsOver(over)).toEqual([CONST_AT])
})

test("an address stating no page type refuses the whole answer", () => {
  const said = renamePageAddresses(worldOf({}), { moved: { "held-one": ONE_NOW } })

  expect(said.refused).toContain("is no address")
})

test("an address handed in as its own new address refuses the whole answer", () => {
  const said = renamePageAddresses(worldOf({}), { moved: { [ONE_WAS]: ONE_WAS } })

  expect(said.refused).toContain("already carries")
})

test("a call handing in no address at all is refused", () => {
  const said = renamePageAddresses(worldOf({}), { moved: {} })

  expect(said.refused).toContain("no address was handed in")
})
