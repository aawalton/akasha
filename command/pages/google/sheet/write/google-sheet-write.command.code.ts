import {
  type Cell,
  valuesWritten,
} from "akasha/alan/google/sheets/modules/sheets-client/sheets-client.module.code.ts"
import { decodeUtf8 } from "akasha/code/body/modules/utf8-body/utf8-body.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { sheet } from "akasha/command/argument/pages/sheet.argument.ts"
import { sheetRange } from "akasha/command/argument/pages/sheet-range.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inputIn, type Piping } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  rangeFor,
  sheetAnswered,
} from "akasha/command/pages/google/sheet/modules/sheet-answering/sheet-answering.module.code.ts"
import { googleSheetWrite as page } from "akasha/command/pages/google/sheet/write/google-sheet-write.command.ts"
import { z } from "zod"

const ROWS = z.array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])))

const ROWS_SAID = "a JSON list of rows, each a list of cells"

type Rows = { readonly rows: readonly (readonly Cell[])[] } | { readonly refusal: string }

export function rowsIn(piping: Piping, calledAs: string): Rows {
  const held = piping()
  if ("tty" in held) return { refusal: `\`${calledAs}\` takes its cells piped in, as ${ROWS_SAID}` }
  if ("unreadable" in held)
    return { refusal: `the cells piped in could not be read — ${held.unreadable}` }
  const text = decodeUtf8(held.bytes)
  if (text === null || text.trim() === "") {
    return { refusal: `\`${calledAs}\` takes its cells piped in, as ${ROWS_SAID}` }
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { refusal: `the cells piped in are not JSON, and they are taken as ${ROWS_SAID}` }
  }
  const rows = ROWS.safeParse(parsed)
  if (!rows.success) return { refusal: `the cells piped in are not ${ROWS_SAID}` }
  return { rows: rows.data }
}

export function googleSheetWrite(
  argv: readonly string[],
  given: Given,
  piping: Piping = inputIn
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [sheet, sheetRange])
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  const cells = rowsIn(piping, given.calledAs)
  if ("refusal" in cells) return Promise.resolve(mistaking([cells.refusal]))
  return sheetAnswered(taken.sheet, async (requesting, address) => {
    const range = await rangeFor(requesting, address, taken.sheetRange)
    const wrote = await valuesWritten(requesting, address.spreadsheetId, range, cells.rows)
    return told([`wrote ${wrote.cells} cells into ${wrote.range}`])
  })
}
