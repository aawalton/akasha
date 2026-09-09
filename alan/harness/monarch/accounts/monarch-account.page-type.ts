import type { PageType } from "@akasha/pages/page-type"

export const monarchAccount = {
  id: "01a0680a-1a00-7008-8d64-7a3b9e1f1109",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "monarch-account",
  definition: "one balance, whether it is money held or money owed",
  pluralSlug: "monarch-accounts",
  extends: ["page-type/monarch-record"],
  parts: [
    "boolean-property/account-active",
    "boolean-property/account-hidden",
    "boolean-property/asset",
    "number-property/current-balance",
    "select-property/account-type",
    "text-property/account-display-name",
  ],
  properties: [
    { pageProperty: "text-property/account-display-name", required: true, many: false },
    { pageProperty: "number-property/current-balance", required: true, many: false },
    { pageProperty: "select-property/account-type", required: true, many: false },
    { pageProperty: "boolean-property/asset", required: true, many: false },
    { pageProperty: "boolean-property/account-active", required: true, many: false },
    { pageProperty: "boolean-property/account-hidden", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account with no transaction is still an account.",
    },
    {
      invariantKind: "departure",
      statement: "A retirement or brokerage balance moves without a row against that balance.",
    },
    {
      invariantKind: "departure",
      statement:
        "Monarch reopens a closed account under a second id rather than reviving the first id.",
    },
    {
      invariantKind: "departure",
      statement: "Two accounts have the same last four digits.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account named by digits alone takes `account-` ahead of those digits for its slug.",
    },
    {
      invariantKind: "gap",
      statement: "A transaction whose account has no page is dropped by the sync without a word.",
    },
  ],
  types: "ts",
} as const satisfies PageType
