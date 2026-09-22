import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const discNumber = {
  id: "01a0a5df-ff89-7f60-a3a6-f27b5e02d970",
  type: "page-type/number-property",
  slug: "disc-number",
  propertySlug: "disc-number",
  definition: "a track's disc within a release",
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
} as const satisfies NumberProperty
