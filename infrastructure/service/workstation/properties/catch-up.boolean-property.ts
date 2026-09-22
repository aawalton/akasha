import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const catchUp = {
  id: "01a05a3f-b42f-7a04-a555-5691399a9e74",
  type: "page-type/boolean-property",
  slug: "catch-up",
  propertySlug: "catch-up",
  definition: "whether a timer runs for the time it was down",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A timer stating false lets a missed time go by.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
