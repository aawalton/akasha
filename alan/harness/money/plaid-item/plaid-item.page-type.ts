import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const plaidItem = {
  id: "01a15468-5c70-70b1-88a1-29c199686e8f",
  type: "page-type/page-type",
  slug: "plaid-item",
  definition: "a bank Alan linked through Plaid on keys of his own",
  extends: ["page-type/page"],
  parts: [
    "text-property/plaid-item-access-token",
    "text-property/plaid-item-client-id",
    "text-property/plaid-item-secret",
  ],
  properties: [
    {
      pageProperty: "text-property/plaid-item-client-id",
      required: false,
      many: false,
      secret: true,
    },
    {
      pageProperty: "text-property/plaid-item-secret",
      required: false,
      many: false,
      secret: true,
    },
    {
      pageProperty: "text-property/plaid-item-access-token",
      required: false,
      many: false,
      secret: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every key is in the sops file beside the page and never in the page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Plaid's Trial plan links ten banks for life, and removing one frees none.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The days of history a link reaches are fixed when that bank is linked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every link asks Plaid for the 730 days Plaid allows at most.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-19T13:44:47.983Z",
  updatedAt: "2026-10-19T13:44:47.983Z",
} as const satisfies PageType
