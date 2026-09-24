import { expect, mock, test } from "bun:test"

const OPENED: string[] = []

mock.module("vscode", () => ({
  Uri: { parse: (url: string) => ({ toString: () => url }) },
  env: {
    openExternal: async (uri: { toString: () => string }) => {
      OPENED.push(uri.toString())
      return true
    },
  },
}))

const { openSeatPage, seatPageUrl } = await import(
  "akasha/code/editor/extension/modules/seat-page-opening/seat-page-opening.module.code.ts"
)

const ATHENA = { id: "01a0d3de-5833-7000-b90e-a639d4f99cd4", name: "athena" }

test("a seat's page is its name and the last eight characters of its id", () => {
  expect(seatPageUrl(ATHENA)).toBe("https://alanwalton.com/seat/athena-d4f99cd4")
})

test("choosing a seat opens that seat's page in the browser", async () => {
  OPENED.length = 0
  await openSeatPage({ ...ATHENA, kind: "seat", live: true, children: [] })
  expect(OPENED).toEqual(["https://alanwalton.com/seat/athena-d4f99cd4"])
})

test("a row that is no seat opens nothing", async () => {
  OPENED.length = 0
  await openSeatPage({ kind: "root" })
  expect(OPENED).toEqual([])
})
