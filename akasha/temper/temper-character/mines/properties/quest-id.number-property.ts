import type { NumberProperty } from "@akasha/pages-system/number-property"

export type QuestId = number

export const questId = {
  id: "01a05fcd-f552-74af-93bb-fae63aec0744",
  pageTypeSlug: "number-property",
  slug: "quest-id",
  propertySlug: "quest-id",
  definition: "the number the game names a quest by",
  max: null,
} as const satisfies NumberProperty
