import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const account = {
  id: "01a0680a-1a00-7010-9e43-7f1d8a5b1110",
  type: "page-type/relation-property",
  slug: "account",
  propertySlug: "account",
  definition: "a holding's or a transaction's account",
  targetPageType: "page-type/monarch-account",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding sits under exactly one account.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-09-22T13:45:29.000Z",
} as const satisfies RelationProperty
