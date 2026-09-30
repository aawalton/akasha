import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterCurrency = {
  id: "01a0f1da-0622-7eb8-8a85-b68dcc940fd1",
  type: "page-type/page-type",
  slug: "metric-character-currency",
  definition: "the money a character carries, counted in its currency's smallest unit",
  pluralSlug: "purses",
  extends: ["page-type/metric-character"],
  parts: ["relation-property/purse-currency"],
  properties: [{ pageProperty: "relation-property/purse-currency", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's purses are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse's names and coins are its currency's, set for its story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is drawn with what a character carries rather than among resources.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
