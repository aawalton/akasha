import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const ownProgress = {
  id: "01a06553-4713-7001-b03b-f1f7f97f1aa8",
  type: "page-type/number-property",
  slug: "own-progress",
  propertySlug: "own-progress",
  definition: "how far through a collection a person has got, counted in its own unit",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Progress is read against the collection's own length rather than against its parts.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
