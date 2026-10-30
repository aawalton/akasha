import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const colorFrom = {
  id: "01a063bd-a526-7595-8a5b-3e28242bfe2b",
  type: "page-type/relation-property",
  slug: "color-from",
  propertySlug: "color-from",
  definition: "the readout whose number gives the color of a readout",
  targetPageType: "page-type/readout",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout taking another's color is colored with that other's number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The figure stays the number this readout took.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T17:21:46.383Z",
} as const satisfies RelationProperty
