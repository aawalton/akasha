import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Performed = boolean

export const performed = {
  id: "01a06243-144b-7008-8401-2cea9948eac0",
  pageTypeSlug: "boolean-property",
  slug: "performed",
  propertySlug: "performed",
  definition: "whether the artist performs the song themselves",
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "Every song is performed by its own artist.",
    },
  ],
} as const satisfies BooleanProperty
