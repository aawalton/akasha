import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { renamePageType, runChange } from "./rename-page-type.change-agent.code.ts"

const ASKED = "the world was asked"

const TO = "carried"

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

const A_TYPE = "changes/kept.page-type.ts"

test("a page that is no page type is refused, and the refusal names the change renaming a page", async () => {
  const said = await renamePageType(UNASKED, { at: NO_TYPE, to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/rename-page/)
})

test("a path reading as no page file is refused", async () => {
  const said = await renamePageType(UNASKED, { at: "changes/notes.md", to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/no page file/)
})

test("a page type this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  let handed: unknown = null
  const reaching = (_world: World, at: string, given: unknown): Promise<typeof NOTHING_OVER> => {
    reached = at
    handed = given
    return Promise.resolve(NOTHING_OVER)
  }

  const said = await renamePageType({ ...UNASKED, reaching }, { at: A_TYPE, to: TO })

  expect(reached).toBe("change-mechanical/rename-file-page-type")
  expect(handed).toEqual({ at: A_TYPE, to: TO })
  expect(said.refused).toBeNull()
})

test("a plural the act was handed is handed on to that change", async () => {
  let handed: unknown = null
  const reaching = (_world: World, _at: string, given: unknown): Promise<typeof NOTHING_OVER> => {
    handed = given
    return Promise.resolve(NOTHING_OVER)
  }

  await runChange({ ...UNASKED, reaching }, { at: A_TYPE, to: TO, plural: "carrieds" })

  expect(handed).toEqual({ at: A_TYPE, to: TO, plural: "carrieds" })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const neither = await runChange(UNASKED, {})
  const noTo = await runChange(UNASKED, { at: A_TYPE })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})
