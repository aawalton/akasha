import { expect, test } from "bun:test"
import { divideFileCodeCommand } from "akasha/change/agent/file/divide-file-code/divide-file-code.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { divideFileCode } from "akasha/change/mechanical/file/divide/divide-file-code/divide-file-code.change-mechanical.ts"
import {
  addedAt,
  FROM,
  HELD,
  TO,
  worldOf,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.test-fixtures.ts"
import { NOTHING_OVER } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const DIVIDED = `${changeMechanical.slug}/${divideFileCode.slug}` as const

test("the three arguments are answered as the edits the division leaves", async () => {
  const said = await divideFileCodeCommand(worldOf({ [FROM]: HELD }), {
    from: FROM,
    to: TO,
    of: "Kept",
  })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toContain("export type Kept = {")
})

test("arguments holding no path to divide are refused by the name of the argument", async () => {
  const said = await divideFileCodeCommand(worldOf({}), { to: TO, of: "Kept" })

  expect(said.refused ?? "").toMatch(/`from`/)
})

test("arguments holding no path to make are refused by the name of the argument", async () => {
  const said = await divideFileCodeCommand(worldOf({}), { from: FROM, of: "Kept" })

  expect(said.refused ?? "").toMatch(/`to`/)
})

test("arguments naming no export are refused by the name of the argument", async () => {
  const said = await divideFileCodeCommand(worldOf({}), { from: FROM, to: TO })

  expect(said.refused ?? "").toMatch(/`of`/)
})

test("the division this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  let handed: unknown = null
  const said = await divideFileCodeCommand(
    {
      ...worldOf({}),
      reaching: (_world, at, given) => {
        reached = at
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { from: FROM, to: TO, of: "Kept Other" }
  )

  expect(reached).toBe(DIVIDED)
  expect(handed).toEqual({ from: FROM, to: TO, of: "Kept Other" })
  expect(said.refused).toBeNull()
})
