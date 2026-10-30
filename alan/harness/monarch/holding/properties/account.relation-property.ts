import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const account = {
  id: "01a0680a-1a00-7010-9e43-7f1d8a5b1110",
  type: "page-type/relation-property",
  slug: "account",
  propertySlug: "account",
  definition: "the account of a Monarch holding or a transaction",
  targetPageType: "page-type/monarch-account",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding sits under exactly one account.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:48:58.237Z",
} as const satisfies RelationProperty
