import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const discNumber = {
  id: "01a0a5df-ff89-7f60-a3a6-f27b5e02d970",
  type: "page-type/number-property",
  slug: "disc-number",
  propertySlug: "disc-number",
  definition: "the number of a track's disc on a release",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A release of one disc states that disc as the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track's place on a release is its disc and its position together.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-15T16:21:55.721Z",
  updatedAt: "2026-10-30T16:20:05.027Z",
} as const satisfies NumberProperty
