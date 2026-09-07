import { expect, test } from "bun:test"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePageAddress } from "./rename-page-address.change-mechanical.code.ts"

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

function worldOf(bodies: Readonly<Record<string, string>>, made: readonly string[] = []): World {
  return {
    root: "/nowhere",
    index: {
      everyPath: () => Object.keys(bodies),
      pageAt: (kind: string, slug: string) =>
        kind === "file-property" && made.includes(slug) ? { machineWritten: true } : null,
    } as never,
    textOf: (path) => bodies[path] ?? null,
    over: NOTHING_OVER,
  }
}

function bodyOf(said: Answer, path: string): string {
  expect(said.refused).toBe(null)
  return said.edits.find((one) => one.path === path)?.body ?? ""
}

test("an address a top-level const holds is restated", () => {
  const said = renamePageAddress(worldOf({ [CONST_AT]: CONST_BODY }), { was: WAS, now: NOW })

  expect(bodyOf(said, CONST_AT)).toContain(`const HELD_ONE = "${NOW}"`)
})

test("an address stated among a page's parts is restated", () => {
  const said = renamePageAddress(worldOf({ [PAGE_AT]: PAGE_BODY }), { was: WAS, now: NOW })

  expect(bodyOf(said, PAGE_AT)).toContain(`["${BESIDE}", "${NOW}"]`)
})

test("an address handed to a call is restated", () => {
  const said = renamePageAddress(worldOf({ [CALL_AT]: CALL_BODY }), { was: WAS, now: NOW })

  expect(bodyOf(said, CALL_AT)).toBe(`held(world, "${NOW}", {})\n`)
})

test("every body spelling the address is answered at once", () => {
  const said = renamePageAddress(
    worldOf({ [CONST_AT]: CONST_BODY, [PAGE_AT]: PAGE_BODY, [CALL_AT]: CALL_BODY }),
    { was: WAS, now: NOW }
  )

  expect(said.edits.map((one) => one.path).sort()).toEqual([CALL_AT, CONST_AT, PAGE_AT].sort())
})

test("a body a machine writes is left as that body is", () => {
  const said = renamePageAddress(worldOf({ [MADE_AT]: MADE_BODY }, ["addressed"]), {
    was: WAS,
    now: NOW,
  })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(0)
})

test("a body beside a page under no machine-written property is restated", () => {
  const said = renamePageAddress(worldOf({ [CONST_AT]: CONST_BODY }, ["addressed"]), {
    was: WAS,
    now: NOW,
  })

  expect(bodyOf(said, CONST_AT)).toContain(`"${NOW}"`)
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
