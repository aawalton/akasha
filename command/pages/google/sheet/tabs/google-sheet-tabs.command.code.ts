import type { SheetTab } from "akasha/alan/google/sheets/modules/sheets-address/sheets-address.module.code.ts"
import { tabsOf } from "akasha/alan/google/sheets/modules/sheets-client/sheets-client.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { sheet } from "akasha/command/argument/pages/sheet.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { sheetAnswered } from "akasha/command/pages/google/sheet/modules/sheet-answering/sheet-answering.module.code.ts"
import { googleSheetTabs as page } from "akasha/command/pages/google/sheet/tabs/google-sheet-tabs.command.ts"

export function tabLines(tabs: readonly SheetTab[]): readonly string[] {
  return tabs.map(
    (one) => `${one.title}\tgid ${one.gid}\t${one.rows} rows × ${one.columns} columns`
  )
}

export function googleSheetTabs(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [sheet, json])
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  return sheetAnswered(taken.sheet, async (requesting, address) => {
    const tabs = await tabsOf(requesting, address.spreadsheetId)
    return told(taken.json ? [JSON.stringify(tabs)] : tabLines(tabs))
  })
}
