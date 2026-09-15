import { expect, test } from "bun:test"
import {
  readIn,
  runChange,
} from "akasha/change/mechanical/file/divide/divide-file-code/divide-file-code.change-mechanical.code.ts"
import {
  addedAt,
  BARE,
  BOTH,
  FROM,
  HELD,
  LANDED,
  puttingAt,
  SHARED,
  TO,
  USES,
  USING_BOTH,
  worldOf,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.test-fixtures.ts"

test("the names are read off one argument, parted by spaces and by the ends of lines", () => {
  expect(readIn("Kept\nOther Stays\n")).toEqual(["Kept", "Other", "Stays"])
  expect(readIn("  ")).toEqual([])
})

test("the export named lands in the file this change makes", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(LANDED)
})

test("every export named lands in that file by one answer", async () => {
  const said = await runChange(worldOf({ [FROM]: BOTH }), { from: FROM, to: TO, of: "Kept Other" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(SHARED)
})

test("the passages the division leaves are answered as edits of this change's own", async () => {
  const world = worldOf({ [FROM]: BOTH, [USES]: USING_BOTH }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept Other" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, USES)).toEqual([`import type { Kept, Other } from "./two.held.ts"`])
})

test("a landing path already holding a body is refused by the change that carries there", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: BARE })

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/move-code-export/)
})

test("a call naming no export is refused", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no export was named, so nothing is carried")
})

test("a refusal the carrying answers is the refusal answered here", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Missing" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${FROM}\` declares nothing named \`Missing\``)
})
