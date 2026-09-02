import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoQuestId = number

export const esoQuestId = {
  id: "01a06167-3f9a-7001-ad36-69682c60b23e",
  pageTypeSlug: "number-property",
  slug: "eso-quest-id",
  propertySlug: "eso-quest-id",
  definition: "the number the game gives a quest",
  max: null,
} as const satisfies NumberProperty
