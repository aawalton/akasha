import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const performed = {
  id: "01a06243-144b-7008-8401-2cea9948eac0",
  type: "page-type/boolean-property",
  slug: "performed",
  propertySlug: "performed",
  definition: "whether the artist of a song performs the song",
  decisions: [
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every song is performed by its own artist.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:36:44.772Z",
} as const satisfies BooleanProperty
