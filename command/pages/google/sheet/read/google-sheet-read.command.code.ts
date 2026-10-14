import { valuesIn } from "akasha/alan/google/sheets/modules/sheets-client/sheets-client.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { sheet } from "akasha/command/argument/pages/sheet.argument.ts"
import { sheetRange } from "akasha/command/argument/pages/sheet-range.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  rangeFor,
  sheetAnswered,
} from "akasha/command/pages/google/sheet/modules/sheet-answering/sheet-answering.module.code.ts"
import { googleSheetRead as page } from "akasha/command/pages/google/sheet/read/google-sheet-read.command.ts"

export function rowLines(range: string, rows: readonly (readonly string[])[]): readonly string[] {
  return [range, ...rows.map((row) => row.join("\t"))]
}

export function googleSheetRead(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [sheet, sheetRange, json])
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  return sheetAnswered(taken.sheet, async (requesting, address) => {
    const range = await rangeFor(requesting, address, taken.sheetRange)
    const values = await valuesIn(requesting, address.spreadsheetId, range)
    return told(taken.json ? [JSON.stringify(values)] : rowLines(values.range, values.rows))
  })
}
