import { expect, test } from "bun:test"
import { moveCodeExportCommand } from "akasha/change/agent/file-content/move-code-export/move-code-export.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { moveCodeExport } from "akasha/change/mechanical/file-content/move/move-code-export/move-code-export.change-mechanical.ts"
import {
  BARE,
  FROM,
  HELD,
  puttingAt,
  TO,
  USES,
  USING,
  worldOf,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.test-fixtures.ts"
import { NOTHING_OVER } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const MOVED = `${changeMechanical.slug}/${moveCodeExport.slug}` as const

test("the three arguments are answered as the edits the move leaves", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: BARE, [USES]: USING }, [USES])

  const said = await moveCodeExportCommand(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, TO).join("")).toContain("export type Kept = {")
})

test("arguments holding no path to move from are refused by the name of the argument", async () => {
  const said = await moveCodeExportCommand(worldOf({}), { to: TO, of: "Kept" })

  expect(said.refused ?? "").toMatch(/`from`/)
})

test("arguments holding no path to move to are refused by the name of the argument", async () => {
  const said = await moveCodeExportCommand(worldOf({}), { from: FROM, of: "Kept" })

  expect(said.refused ?? "").toMatch(/`to`/)
})

test("arguments naming no type are refused by the name of the argument", async () => {
  const said = await moveCodeExportCommand(worldOf({}), { from: FROM, to: TO })

  expect(said.refused ?? "").toMatch(/`of`/)
})

test("the move this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  let handed: unknown = null
  const said = await moveCodeExportCommand(
    {
      ...worldOf({}),
      reaching: (_world, at, given) => {
        reached = at
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { from: FROM, to: TO, of: "Kept" }
  )

  expect(reached).toBe(MOVED)
  expect(handed).toEqual({ from: FROM, to: TO, of: "Kept" })
  expect(said.refused).toBeNull()
})
