import { expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file-content/move/move-code-export/move-code-export.change-mechanical.code.ts"
import {
  BARE,
  FROM,
  HELD,
  puttingAt,
  TO,
  USES,
  USING,
  worldOf,
} from "akasha/changes/modules/code-export-carrying/code-export-carrying.module.test-fixtures.ts"

test("the passages the carrying leaves are written at the paths the carrying names", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: BARE, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, TO).join("")).toContain("export type Kept = {")
  expect(puttingAt(said, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("a landing path holding no body is refused by the change that makes one", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Kept" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/divide-file-code/)
})

test("a refusal the carrying answers is the refusal answered here", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: BARE })

  const said = await runChange(world, { from: FROM, to: TO, of: "Missing" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${FROM}\` declares nothing named \`Missing\``)
})
