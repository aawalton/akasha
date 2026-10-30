import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const categoryRuleCode = {
  id: "01a0680c-3c00-7008-9c73-6a2e5d8b3109",
  type: "page-type/page-type",
  slug: "category-rule-code",
  definition: "a category rule that needs no person to read a transaction",
  extends: ["page-type/category-rule"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule of this kind is settled by its clauses without anybody reading the row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule of this kind naming no category catches a row for a person to settle.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-10-30T15:43:05.332Z",
} as const satisfies PageType
