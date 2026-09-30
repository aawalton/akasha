import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCurrency = {
  id: "01a0f1da-0622-7635-9a06-b7c5f8bb061e",
  type: "page-type/page-type",
  slug: "world-currency",
  definition: "the money a world counts, and the coins it is counted in",
  pluralSlug: "currencies",
  extends: ["page-type/world-mechanic"],
  parts: [
    "record-property/currency-denominations",
    "text-property/denomination-name",
    "number-property/denomination-worth",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "record-property/currency-denominations",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  runsTabooCheck: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A currency's title is what the story calls its money.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A currency counted in one kind of coin states no denominations.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What money buys, and how a price is settled, is the story's money mechanic.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
