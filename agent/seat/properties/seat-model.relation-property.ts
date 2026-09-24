import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const seatModel = {
  id: "01a0d4ba-6551-7a59-bacb-8120838c058b",
  type: "page-type/relation-property",
  slug: "seat-model",
  propertySlug: "model",
  definition: "the model version answering in a seat",
  targetPageType: "page-type/model-version",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat running a model no model version states has no model written.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
