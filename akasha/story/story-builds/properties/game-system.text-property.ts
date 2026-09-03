import type { TextProperty } from "@akasha/pages-system/text-property"

export type GameSystem = string

export const gameSystem = {
  id: "01a06577-f385-7913-8218-84f47eaafa5d",
  pageTypeSlug: "text-property",
  slug: "game-system",
  propertySlug: "game-system",
  definition: "the rules a build is read against, said in full",
  max: 20000,
  nameFormatSlug: null,
} as const satisfies TextProperty
