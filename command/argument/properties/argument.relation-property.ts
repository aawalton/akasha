import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const argument = {
  id: "01a09409-0740-76a5-b194-5aae0e0a6f9b",
  type: "page-type/relation-property",
  slug: "argument",
  propertySlug: "argument",
  definition: "the argument a command names",
  targetPageType: "page-type/argument",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument no page names is refused rather than read.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-12T05:13:34.784Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
