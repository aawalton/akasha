import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const haremHotelQuestObjective = {
  id: "01a0de28-77bc-774f-b4c1-f16925dd76ca",
  type: "page-type/text-property",
  slug: "harem-hotel-quest-objective",
  propertySlug: "objective",
  definition: "what the character a quest is set for must do",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
