import { expect, test } from "bun:test"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePageAddress } from "./rename-page-address.change-mechanical.code.ts"

const WAS = "change-mechanical/remove-file"

const NOW = "change-mechanical-file/remove-file"

const CONST_AT = "changes/checked/pages/remove-file/remove-file.change-checked.code.ts"

const CONST_BODY = `const REMOVE_FILE = "change-mechanical/remove-file"

export function held(): string {
  return REMOVE_FILE
}
`

const PAGE_AT = "changes/mechanical/change-mechanical.page-type.ts"

const PAGE_BODY = `export const changeMechanical = {
  partSlugs: ["change-mechanical/move-file", "change-mechanical/remove-file"],
}
`

const CALL_AT = "changes/modules/change-shadow/change-shadow.module.test.ts"

const CALL_BODY = `held(world, "change-mechanical/remove-file", {})
`

const BARE_AT = "changes/mechanical/pages/remove-page/remove-page.change-mechanical.ts"

const BARE_BODY = `export const removePage = {
  slug: "remove-file",
}
`

function worldOf(bodies: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: { everyPath: () => Object.keys(bodies) } as never,
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

  expect(bodyOf(said, CONST_AT)).toContain(`const REMOVE_FILE = "${NOW}"`)
})

test("an address stated among a page's parts is restated", () => {
  const said = renamePageAddress(worldOf({ [PAGE_AT]: PAGE_BODY }), { was: WAS, now: NOW })

  expect(bodyOf(said, PAGE_AT)).toContain(`["change-mechanical/move-file", "${NOW}"]`)
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
  const said = renamePageAddress(worldOf({}), { was: "remove-file", now: NOW })

  expect(said.refused).toContain("is no address")
})

test("the address a page already carries is refused", () => {
  const said = renamePageAddress(worldOf({}), { was: WAS, now: WAS })

  expect(said.refused).toContain("already carries")
})
