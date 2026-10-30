import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const readoutColor = {
  id: "01a0cb2c-aa72-7eb6-8cb5-e5600d14d04f",
  type: "page-type/relation-property",
  slug: "readout-color",
  propertySlug: "color",
  definition: "the color a readout has at every number",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating a color takes that color whatever the reading is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating a color needs no scale.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-22T22:11:37.202Z",
  updatedAt: "2026-10-30T16:10:54.116Z",
} as const satisfies RelationProperty
