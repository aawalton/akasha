import { expect, test } from "bun:test"
import type { SheetsRequesting } from "akasha/alan/google/sheets/modules/sheets-client/sheets-client.module.code.ts"
import {
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  rangeFor,
  sheetAnswered,
  sheetRefused,
} from "akasha/command/pages/google/sheet/modules/sheet-answering/sheet-answering.module.code.ts"

const ID = "1rxGy7zNVXzOtnrILAWUtkosfELOE3Izknl3y9dW_Czg"

const TABS = {
  sheets: [
    { properties: { title: "Overview", sheetId: 0 } },
    { properties: { title: "Builds", sheetId: 42 } },
  ],
}

function answering(body: unknown): SheetsRequesting {
  return async () => body
}

async function reached(): Promise<SheetsRequesting> {
  return answering(TABS)
}

test("a sheet no consent can reach is answered as the data", () => {
  const said = sheetRefused({ status: 404 }, ID)
  expect(said.code).toBe(DATA)
  expect(said.refusals.join(" ")).toContain("names no sheet")
})

test("a consent Sheets turns away names the login granting a fresh one", () => {
  const said = sheetRefused({ response: { status: 403 } }, ID)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals.join(" ")).toContain("akasha google login")
})

test("a word naming no sheet is refused before anything is asked of Google", async () => {
  let asked = false
  const said = await sheetAnswered(
    "abc",
    async () => told([]),
    async () => {
      asked = true
      return answering(TABS)
    }
  )
  expect(said.code).toBe(INPUT)
  expect(asked).toBe(false)
})

test("the work is handed the sheet the URL names", async () => {
  const said = await sheetAnswered(
    `https://docs.google.com/spreadsheets/d/${ID}/edit#gid=42`,
    async (_requesting, address) => told([`${address.spreadsheetId} ${address.gid}`]),
    reached
  )
  expect(said.code).toBe(OK)
  expect(said.report).toEqual([`${ID} 42`])
})

test("a range naming its tab asks nothing of the sheet", async () => {
  const asking: SheetsRequesting = async () => {
    throw new Error("asked")
  }
  expect(await rangeFor(asking, { spreadsheetId: ID, gid: 42 }, "Overview!A1")).toBe("Overview!A1")
})

test("a range naming no tab is read in the tab the URL names", async () => {
  expect(await rangeFor(answering(TABS), { spreadsheetId: ID, gid: 42 }, "A1:B2")).toBe(
    "'Builds'!A1:B2"
  )
})
