import type { TextProperty } from "@akasha/pages-system/text-property"

export type SoloDifficulty = string

export const soloDifficulty = {
  id: "01a05fc4-7a94-7c7a-a850-0f1b6fb1427d",
  pageTypeSlug: "text-property",
  slug: "solo-difficulty",
  propertySlug: "solo-difficulty",
  definition: "how hard a dungeon is to get through alone",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
