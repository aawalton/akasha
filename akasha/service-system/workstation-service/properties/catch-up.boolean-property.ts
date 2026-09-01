import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type CatchUp = boolean

export const catchUp = {
  id: "01a05a3f-b42f-7a04-a555-5691399a9e74",
  pageTypeSlug: "boolean-property",
  slug: "catch-up",
  propertySlug: "catch-up",
  definition: "whether a timer runs for a time it was down for",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A timer stating false lets a missed time go by.",
    },
  ],
} as const satisfies BooleanProperty
