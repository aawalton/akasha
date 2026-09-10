import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const monarchHolding = {
  id: "01a0680a-1a00-7016-b283-5a9c7e1f1116",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "monarch-holding",
  definition: "how much of one investment an account holds",
  pluralSlug: "monarch-holdings",
  extends: ["page-type/monarch-record"],
  parts: [
    "number-property/cost-basis",
    "number-property/holding-value",
    "number-property/quantity",
    "relation-property/account",
    "text-property/security-name",
    "text-property/ticker",
  ],
  properties: [
    { pageProperty: "relation-property/account", required: true, many: false },
    { pageProperty: "text-property/security-name", required: true, many: false },
    { pageProperty: "text-property/ticker", required: true, many: false },
    { pageProperty: "number-property/quantity", required: true, many: false },
    { pageProperty: "number-property/cost-basis", required: true, many: false },
    { pageProperty: "number-property/holding-value", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Monarch reports a holding only for an account that says that account has holdings.",
    },
    {
      invariantKind: "departure",
      statement: "A holding is three figures the daily sync rewrites.",
    },
    {
      invariantKind: "departure",
      statement: "A holding sits in memory.",
    },
  ],
  types: "ts",
} as const satisfies PageType
