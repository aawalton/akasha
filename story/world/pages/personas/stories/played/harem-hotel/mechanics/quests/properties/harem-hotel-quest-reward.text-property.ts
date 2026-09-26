import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const haremHotelQuestReward = {
  id: "01a0de28-77bc-7307-9cd5-acddb8b7fcc1",
  type: "page-type/text-property",
  slug: "harem-hotel-quest-reward",
  propertySlug: "reward",
  definition: "what completing a quest gives",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
