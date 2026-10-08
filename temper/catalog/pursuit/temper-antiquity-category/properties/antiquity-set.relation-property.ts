import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const antiquitySet = {
  id: "01a0d5cf-fa9e-7e4c-9f8f-ccc20e484d78",
  type: "page-type/relation-property",
  slug: "antiquity-set",
  propertySlug: "set",
  definition: "the set of antiquity leads an antiquity is one of",
  targetPageType: "page-type/temper-antiquity-set",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An antiquity no set holds states no set.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T23:46:12.254Z",
  updatedAt: "2026-09-24T23:46:16.000Z",
} as const satisfies RelationProperty
