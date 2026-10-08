import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const seatModel = {
  id: "01a0d4ba-6551-7a59-bacb-8120838c058b",
  type: "page-type/relation-property",
  slug: "seat-model",
  propertySlug: "model",
  definition: "the model version a seat runs",
  targetPageType: "page-type/model-version",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat running a model no model version states has no model written.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T18:43:00.561Z",
  updatedAt: "2026-09-25T18:09:44.000Z",
} as const satisfies RelationProperty
