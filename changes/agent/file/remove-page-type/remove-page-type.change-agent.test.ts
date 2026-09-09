import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { removePageType } from "./remove-page-type.change-agent.code.ts"

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
  bodyOf: () => {
    throw new Error(ASKED)
  },
  under: () => [],
  base: () => {
    throw new Error(ASKED)
  },
  over: NOTHING_OVER,
}

const NO_TYPE = "changes/pages/remove-file/remove-file.change.ts"

test("a page that is no page type is refused, and the refusal names the change taking a page away", async () => {
  const said = await removePageType(UNASKED, { at: NO_TYPE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/remove-page/)
})

test("a page that is no page type is refused from the path alone, with the world never asked", async () => {
  const said = await removePageType(UNASKED, { at: NO_TYPE })

  expect(said.edits).toEqual([])
})

test("a path reading as no page file is refused", async () => {
  const said = await removePageType(UNASKED, { at: "changes/notes.md" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/no page file/)
})

test("a page type this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const reaching = (_world: World, at: string): Promise<typeof NOTHING_OVER> => {
    reached = at
    return Promise.resolve(NOTHING_OVER)
  }

  const said = await removePageType({ ...UNASKED, reaching }, { at: "changes/kept.page-type.ts" })

  expect(reached).toBe("change-mechanical/remove-file-page-type")
  expect(said.refused).toBeNull()
})
