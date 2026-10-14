import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { piping, terminal } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import {
  googleSheetWrite,
  rowsIn,
} from "akasha/command/pages/google/sheet/write/google-sheet-write.command.code.ts"

const CALLED_AS = "akasha google sheet write"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ID = "1rxGy7zNVXzOtnrILAWUtkosfELOE3Izknl3y9dW_Czg"

test("rows of text, numbers, booleans and nulls are taken", () => {
  expect(rowsIn(piping('[["=1+1", 3], [true, null]]'), CALLED_AS)).toEqual({
    rows: [
      ["=1+1", 3],
      [true, null],
    ],
  })
})

test("nothing piped in is refused, naming the shape taken", () => {
  const said = rowsIn(terminal, CALLED_AS)
  expect("refusal" in said && said.refusal).toContain("JSON list of rows")
})

test("text that is not JSON is refused", () => {
  const said = rowsIn(piping("a,b"), CALLED_AS)
  expect("refusal" in said && said.refusal).toContain("not JSON")
})

test("JSON that is not rows of cells is refused", () => {
  const said = rowsIn(piping('{"a": 1}'), CALLED_AS)
  expect("refusal" in said && said.refusal).toContain("not a JSON list of rows")
})

test("a call naming no range is refused before the cells are read", async () => {
  let read = false
  const said = await googleSheetWrite([ID], GIVEN, () => {
    read = true
    return terminal()
  })
  expect(said.code).toBe(INPUT)
  expect(read).toBe(false)
})

test("cells not that shape are refused before anything is asked of Google", async () => {
  const said = await googleSheetWrite([ID, "--range", "A1"], GIVEN, piping("[1, 2]"))
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join(" ")).toContain("JSON list of rows")
})
