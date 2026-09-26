import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const haremHotelQuestStatus = {
  id: "01a0de28-77bc-7f81-a2e6-b609dbab883f",
  type: "page-type/select-property",
  slug: "harem-hotel-quest-status",
  propertySlug: "status",
  definition: "whether a quest is active or complete",
  values: ["active", "complete"],
  types: "ts",
} as const satisfies SelectProperty
