import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { sheet } from "akasha/command/argument/pages/sheet.argument.ts"
import { sheetRange } from "akasha/command/argument/pages/sheet-range.argument.ts"
import { rowLines } from "akasha/command/pages/google/sheet/read/google-sheet-read.command.code.ts"
import { googleSheetRead as page } from "akasha/command/pages/google/sheet/read/google-sheet-read.command.ts"

const CALLED_AS = "akasha google sheet read"

const NAMED = [sheet, sheetRange, json] as const

test("a call naming no sheet is refused", () => {
  const read = takenFor(["--range", "A1"], CALLED_AS, page, NAMED)
  expect("refused" in read).toBe(true)
})

test("the range is read at its flag", () => {
  const read = takenFor(["1AbC", "--range", "Builds!A1:C3"], CALLED_AS, page, NAMED)
  if ("refused" in read) throw new Error("this was refused")
  expect(read.taken.sheet).toBe("1AbC")
  expect(read.taken.sheetRange).toBe("Builds!A1:C3")
})

test("the range read comes first, then each row with its cells parted by tabs", () => {
  expect(rowLines("'Builds'!A1:B2", [["a", "b"], ["c"]])).toEqual(["'Builds'!A1:B2", "a\tb", "c"])
})
