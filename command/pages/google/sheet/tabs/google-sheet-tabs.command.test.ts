import { expect, test } from "bun:test"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { sheet } from "akasha/command/argument/pages/sheet.argument.ts"
import { tabLines } from "akasha/command/pages/google/sheet/tabs/google-sheet-tabs.command.code.ts"
import { googleSheetTabs as page } from "akasha/command/pages/google/sheet/tabs/google-sheet-tabs.command.ts"

const CALLED_AS = "akasha google sheet tabs"

const NAMED = [sheet, json] as const

test("a call naming no sheet is refused", () => {
  const read = takenFor([], CALLED_AS, page, NAMED)
  expect("refused" in read).toBe(true)
})

test("the sheet is read from the word said in place", () => {
  const read = takenFor(["1AbC"], CALLED_AS, page, NAMED)
  if ("refused" in read) throw new Error("this was refused")
  expect(read.taken.sheet).toBe("1AbC")
  expect(read.taken.json).toBe(false)
})

test("each tab is answered on one line with its gid and size", () => {
  expect(tabLines([{ title: "Builds", gid: 42, rows: 9, columns: 3 }])).toEqual([
    "Builds\tgid 42\t9 rows × 3 columns",
  ])
})
