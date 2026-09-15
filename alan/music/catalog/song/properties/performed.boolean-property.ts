import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const performed = {
  id: "01a06243-144b-7008-8401-2cea9948eac0",
  type: "page-type/boolean-property",
  slug: "performed",
  propertySlug: "performed",
  definition: "whether the artist performs the song themselves",
  decisions: [
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every song is performed by its own artist.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
