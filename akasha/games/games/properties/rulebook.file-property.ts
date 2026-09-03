import type { FileProperty } from "@akasha/pages-system/file-property"

export type Rulebook = "json"

export const rulebook = {
  id: "01a0673c-8e0e-7012-9530-56ad5cd13631",
  pageTypeSlug: "file-property",
  slug: "rulebook",
  propertySlug: "rulebook",
  definition: "the rules a game is played by",
} as const satisfies FileProperty
