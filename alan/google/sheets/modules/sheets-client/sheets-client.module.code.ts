import { makeGoogleOauthClient } from "akasha/alan/google/oauth/modules/oauth-client/oauth-client.module.code.ts"
import type { SheetTab } from "akasha/alan/google/sheets/modules/sheets-address/sheets-address.module.code.ts"
import { readSheetsCredentials } from "akasha/alan/google/sheets/modules/sheets-credentials/sheets-credentials.module.code.ts"
import { z } from "zod"

const API = "https://sheets.googleapis.com/v4/spreadsheets"

export type Cell = string | number | boolean | null

export interface SheetsRequest {
  readonly url: string
  readonly method: "GET" | "PUT"
  readonly data?: unknown
}

export type SheetsRequesting = (request: SheetsRequest) => Promise<unknown>

export async function sheetsRequesting(): Promise<SheetsRequesting> {
  const { auth } = await import("@googleapis/drive")
  const client = makeGoogleOauthClient(auth.OAuth2, readSheetsCredentials())
  return async (request) => (await client.request({ ...request })).data
}

const TABS_SAID = z.object({
  sheets: z.array(
    z.object({
      properties: z.object({
        title: z.string(),
        sheetId: z.number(),
        gridProperties: z
          .object({ rowCount: z.number().optional(), columnCount: z.number().optional() })
          .optional(),
      }),
    })
  ),
})

const VALUES_SAID = z.object({
  range: z.string(),
  values: z.array(z.array(z.string())).optional(),
})

const WRITTEN_SAID = z.object({
  updatedRange: z.string(),
  updatedCells: z.number().optional(),
})

function sheetAt(spreadsheetId: string): string {
  return `${API}/${encodeURIComponent(spreadsheetId)}`
}

function valuesAt(spreadsheetId: string, range: string): string {
  return `${sheetAt(spreadsheetId)}/values/${encodeURIComponent(range)}`
}

export async function tabsOf(
  requesting: SheetsRequesting,
  spreadsheetId: string
): Promise<readonly SheetTab[]> {
  const said = TABS_SAID.parse(
    await requesting({ url: `${sheetAt(spreadsheetId)}?fields=sheets.properties`, method: "GET" })
  )
  return said.sheets.map(({ properties }) => ({
    title: properties.title,
    gid: properties.sheetId,
    rows: properties.gridProperties?.rowCount ?? 0,
    columns: properties.gridProperties?.columnCount ?? 0,
  }))
}

export async function valuesIn(
  requesting: SheetsRequesting,
  spreadsheetId: string,
  range: string
): Promise<{ readonly range: string; readonly rows: readonly (readonly string[])[] }> {
  const said = VALUES_SAID.parse(
    await requesting({ url: valuesAt(spreadsheetId, range), method: "GET" })
  )
  return { range: said.range, rows: said.values ?? [] }
}

export async function valuesWritten(
  requesting: SheetsRequesting,
  spreadsheetId: string,
  range: string,
  rows: readonly (readonly Cell[])[]
): Promise<{ readonly range: string; readonly cells: number }> {
  const said = WRITTEN_SAID.parse(
    await requesting({
      url: `${valuesAt(spreadsheetId, range)}?valueInputOption=USER_ENTERED`,
      method: "PUT",
      data: { range, majorDimension: "ROWS", values: rows },
    })
  )
  return { range: said.updatedRange, cells: said.updatedCells ?? 0 }
}
