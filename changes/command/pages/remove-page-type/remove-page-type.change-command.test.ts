import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { removePageType } from "./remove-page-type.change-command.code.ts"

const ASKED = "the world was asked"

const UNASKED: World = {
  root: "/nowhere",
  index: new Proxy(
    {},
    {
      get() {
        throw new Error(ASKED)
      },
    }
  ) as never,
  textOf: () => {
    throw new Error(ASKED)
  },
  over: NOTHING_OVER,
}

test("a page that is no page type is refused, and the refusal names the change taking a page away", () => {
  const said = removePageType(UNASKED, { at: "changes/pages/remove-file/remove-file.change.ts" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/remove-page/)
})

test("a page that is no page type is refused from the path alone, with the world never asked", () => {
  expect(() =>
    removePageType(UNASKED, { at: "changes/pages/remove-file/remove-file.change.ts" })
  ).not.toThrow()
})

test("a path reading as no page file is refused", () => {
  const said = removePageType(UNASKED, { at: "changes/notes.md" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/no page file/)
})
