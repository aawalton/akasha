import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const recurring = {
  id: "01a0680b-2b00-700e-9358-2b7d4a6e210f",
  type: "page-type/boolean-property",
  slug: "recurring",
  propertySlug: "recurring",
  definition: "whether Monarch expects a Monarch transaction on a schedule",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:47:35.412Z",
} as const satisfies BooleanProperty
