import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type GameSystem = string

export const gameSystem = {
  id: "01a06577-f385-7913-8218-84f47eaafa5d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "game-system",
  propertySlug: "game-system",
  definition: "the rules a build is read against, said in full",
  maxLength: 20000,
  nameFormat: null,
} as const satisfies TextProperty
