import { expect, test } from "bun:test"
import {
  pageText,
  slugify,
} from "akasha/alan/harness/monarch/domain-files/monarch-domain-files.module.code.ts"
import { TYPES_AT } from "akasha/alan/harness/monarch/domain-files/monarch-domain-files.module.test-fixtures.ts"

const ACCOUNT: Readonly<Record<string, unknown>> = {
  id: "01a06559-5ea7-7001-9e34-1d903a67d968",
  pageTypeSlug: "monarch-account",
  type: "monarch-account",
  slug: "account-1350-e-apple-ave-provo-ut-84604",
  title: "1350 E Apple Ave Provo UT 84604",
  definition: "money the family has, sitting in a home account",
  monarchId: "148843443217373542",
  accountDisplayName: "1350 E Apple Ave Provo UT 84604",
  currentBalance: 1133800,
  accountType: "real_estate",
  asset: true,
  accountActive: true,
  accountHidden: false,
}

function keysIn(said: string): readonly string[] {
  return said
    .split("\n")
    .filter((one) => one.startsWith("  ") && !one.startsWith("   "))
    .map((one) => one.slice(2, one.indexOf(":")))
}

test("a page is one TypeScript file with one exported object named for the page's slug", () => {
  const said = pageText(TYPES_AT, "monarch-account", ACCOUNT)
  expect(said).toContain(`import type { MonarchAccount } from "${TYPES_AT}"`)
  expect(said).toContain("export const account1350EAppleAveProvoUt84604 = {")
  expect(said).toContain("} as const satisfies MonarchAccount")
})

test("the whole body is composed rather than a line of that body patched", () => {
  expect(pageText(TYPES_AT, "monarch-account", ACCOUNT).split("\n")).toEqual([
    `import type { MonarchAccount } from "${TYPES_AT}"`,
    "",
    "export const account1350EAppleAveProvoUt84604 = {",
    '  id: "01a06559-5ea7-7001-9e34-1d903a67d968",',
    '  pageTypeSlug: "monarch-account",',
    '  type: "monarch-account",',
    '  slug: "account-1350-e-apple-ave-provo-ut-84604",',
    '  title: "1350 E Apple Ave Provo UT 84604",',
    '  definition: "money the family has, sitting in a home account",',
    '  monarchId: "148843443217373542",',
    '  accountDisplayName: "1350 E Apple Ave Provo UT 84604",',
    "  currentBalance: 1133800,",
    '  accountType: "real_estate",',
    "  asset: true,",
    "  accountActive: true,",
    "  accountHidden: false,",
    "} as const satisfies MonarchAccount",
    "",
  ])
})

test("the keys a page states are stated in one settled order", () => {
  const said = pageText(TYPES_AT, "monarch-holding", {
    securityName: "Vanguard Total Stock Market",
    slug: "vtsax",
    monarchId: "9",
    id: "an-id",
    quantity: 12.5,
    title: "VTSAX",
    type: "monarch-holding",
    pageTypeSlug: "monarch-holding",
    account: "account-0981",
  })
  expect(keysIn(said)).toEqual([
    "id",
    "pageTypeSlug",
    "type",
    "slug",
    "title",
    "monarchId",
    "securityName",
    "quantity",
    "account",
  ])
})

test("a body closes with one newline", () => {
  const said = pageText(TYPES_AT, "monarch-account", ACCOUNT)
  expect(said.endsWith("satisfies MonarchAccount\n")).toBe(true)
  expect(said.endsWith("\n\n")).toBe(false)
})

test("a name becomes a slug by its words", () => {
  expect(slugify("1350 E Apple Ave Provo UT 84604")).toBe("1350-e-apple-ave-provo-ut-84604")
  expect(slugify("Food & Dining")).toBe("food-and-dining")
  expect(slugify("Alan’s Card")).toBe("alans-card")
})

test("a word repeated next to itself is said once", () => {
  expect(slugify("Cash Cash")).toBe("cash")
  expect(slugify("Cash Card Cash")).toBe("cash-card-cash")
})

test("a masked number in brackets is said as its digits", () => {
  expect(slugify("Checking (...1234)")).toBe("checking-1234")
})
