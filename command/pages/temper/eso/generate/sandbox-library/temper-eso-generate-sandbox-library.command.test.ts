import { expect, test } from "bun:test"
import { pageStatingData } from "akasha/command/pages/temper/eso/generate/sandbox-library/temper-eso-generate-sandbox-library.command.code.ts"

const BARE = `export const sandboxLibrary = {
  type: "page-type/data-table",
  slug: "sandbox-library",
  decisions: [
  ],
} as const satisfies DataTable
`

test("a table page stating no data is given its data before its decisions", () => {
  expect(pageStatingData(BARE)).toContain(
    `  slug: "sandbox-library",\n  data: "json",\n  decisions: [\n`
  )
})

test("a table page already stating its data is left as it is", () => {
  const stating = pageStatingData(BARE)
  expect(pageStatingData(stating)).toBe(stating)
})
