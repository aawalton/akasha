import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { removePage } from "./remove-page.change-agent.code.ts"

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

test("a page type is refused, and the refusal names the change that takes a page type away", async () => {
  const said = await removePage(UNASKED, { at: "changes/change.page-type.ts" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/remove-page-type/)
})

test("a page type is refused from the path alone, with the world never asked", async () => {
  await expect(removePage(UNASKED, { at: "changes/change.page-type.ts" })).resolves.toBeDefined()
})

test("a path reading as no page file is refused", async () => {
  const said = await removePage(UNASKED, { at: "changes/notes.md" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/no page file/)
})

test("a page this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await removePage(
    {
      ...UNASKED,
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: "changes/one.module.ts" }
  )

  expect(reached).toBe("change-mechanical/remove-file-of-any-kind")
  expect(said.refused).toBeNull()
})
