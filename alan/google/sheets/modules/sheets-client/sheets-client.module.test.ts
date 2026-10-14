import { expect, test } from "bun:test"
import {
  type SheetsRequest,
  type SheetsRequesting,
  tabsOf,
  valuesIn,
  valuesWritten,
} from "akasha/alan/google/sheets/modules/sheets-client/sheets-client.module.code.ts"

const ID = "1rxGy7zNVXzOtnrILAWUtkosfELOE3Izknl3y9dW_Czg"

function answering(body: unknown, asked: SheetsRequest[]): SheetsRequesting {
  return async (request) => {
    asked.push(request)
    return body
  }
}

test("the tabs are read as title, gid and size", async () => {
  const asked: SheetsRequest[] = []
  const body = {
    sheets: [
      {
        properties: {
          title: "Builds",
          sheetId: 7,
          gridProperties: { rowCount: 9, columnCount: 3 },
        },
      },
      { properties: { title: "Bare", sheetId: 8 } },
    ],
  }
  expect(await tabsOf(answering(body, asked), ID)).toEqual([
    { title: "Builds", gid: 7, rows: 9, columns: 3 },
    { title: "Bare", gid: 8, rows: 0, columns: 0 },
  ])
  expect(asked[0]?.method).toBe("GET")
  expect(asked[0]?.url).toContain(`/spreadsheets/${ID}?fields=sheets.properties`)
})

test("a range holding nothing answers no rows", async () => {
  const read = await valuesIn(answering({ range: "'Builds'!A1:B2" }, []), ID, "'Builds'!A1:B2")
  expect(read).toEqual({ range: "'Builds'!A1:B2", rows: [] })
})

test("the range read is named whole in the path", async () => {
  const asked: SheetsRequest[] = []
  const body = { range: "'Builds'!A1:B1", values: [["a", "b"]] }
  const read = await valuesIn(answering(body, asked), ID, "'Builds'!A1:B1")
  expect(read.rows).toEqual([["a", "b"]])
  expect(asked[0]?.url).toContain(`/values/${encodeURIComponent("'Builds'!A1:B1")}`)
})

test("cells are written as a person typing them would write them", async () => {
  const asked: SheetsRequest[] = []
  const body = { updatedRange: "'Builds'!A1:B1", updatedCells: 2 }
  const wrote = await valuesWritten(answering(body, asked), ID, "'Builds'!A1", [["=1+1", 3]])
  expect(wrote).toEqual({ range: "'Builds'!A1:B1", cells: 2 })
  expect(asked[0]?.method).toBe("PUT")
  expect(asked[0]?.url).toContain("valueInputOption=USER_ENTERED")
  expect(asked[0]?.data).toEqual({
    range: "'Builds'!A1",
    majorDimension: "ROWS",
    values: [["=1+1", 3]],
  })
})

test("a body not shaped as Sheets answers is refused", async () => {
  await expect(tabsOf(answering({ nope: true }, []), ID)).rejects.toThrow()
})
