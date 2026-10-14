import {
  namesItsTab,
  rangeOf,
  type SheetAddress,
  sheetAddressOf,
} from "akasha/alan/google/sheets/modules/sheets-address/sheets-address.module.code.ts"
import {
  type SheetsRequesting,
  sheetsRequesting,
  tabsOf,
} from "akasha/alan/google/sheets/modules/sheets-client/sheets-client.module.code.ts"
import {
  codeOf,
  DATA,
  OPERATIONAL,
  refused,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"

type Working = (requesting: SheetsRequesting, address: SheetAddress) => Promise<Answer>

function statusOf(thrown: unknown): number | undefined {
  if (typeof thrown !== "object" || thrown === null) return undefined
  const held = thrown as {
    readonly status?: unknown
    readonly response?: { readonly status?: unknown }
  }
  const status = held.status ?? held.response?.status
  return typeof status === "number" ? status : undefined
}

export function sheetRefused(thrown: unknown, sheet: string): Answer {
  const status = statusOf(thrown)
  if (status === 404) {
    return refused(
      `\`${sheet}\` names no sheet this consent can reach — check the id, and that ` +
        "the sheet is shared with the account the consent was granted for",
      DATA
    )
  }
  if (status === 401 || status === 403) {
    return refused(
      `\`${sheet}\` was turned away by Sheets with ${status} — the consent held is missing ` +
        "or lacks the Sheets scope, and `akasha google login` grants a fresh one",
      OPERATIONAL
    )
  }
  return refused(whyOf(thrown), codeOf(thrown))
}

export async function sheetAnswered(
  sheet: string,
  work: Working,
  requesting: () => Promise<SheetsRequesting> = sheetsRequesting
): Promise<Answer> {
  try {
    const address = sheetAddressOf(sheet)
    return await work(await requesting(), address)
  } catch (thrown) {
    return sheetRefused(thrown, sheet)
  }
}

export async function rangeFor(
  requesting: SheetsRequesting,
  address: SheetAddress,
  said: string | undefined
): Promise<string> {
  if (said !== undefined && namesItsTab(said)) return said
  return rangeOf(said, address.gid, await tabsOf(requesting, address.spreadsheetId))
}
