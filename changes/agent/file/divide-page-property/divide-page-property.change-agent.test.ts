import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./divide-page-property.change-agent.code.ts"

const ASKED = "the world was asked"

const DIVIDE = "change-mechanical/divide-file-page-property"

const PAGE = "made-up/logs/one/one.made-up-log.ts"

const PROPERTY = "rows"

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

test("a call handed no page is refused by the key it was handed no value for", async () => {
  const said = await runChange(UNASKED, { property: PROPERTY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("at")
})

test("a call handed no property is refused by the key it was handed no value for", async () => {
  const said = await runChange(UNASKED, { at: PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("property")
})

test("the division is reached through the runner the world carries", async () => {
  let reached = ""
  let handed: unknown = null
  const said = await runChange(
    {
      ...UNASKED,
      reaching: (_world, at, given) => {
        reached = at
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: PAGE, property: PROPERTY }
  )

  expect(reached).toBe(DIVIDE)
  expect(handed).toEqual({ at: PAGE, property: PROPERTY })
  expect(said.refused).toBeNull()
})
