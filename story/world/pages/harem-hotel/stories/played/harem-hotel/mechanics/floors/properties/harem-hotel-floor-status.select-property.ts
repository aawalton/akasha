import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const haremHotelFloorStatus = {
  id: "01a0e822-39b5-7180-a511-44c75b5faad7",
  type: "page-type/select-property",
  slug: "harem-hotel-floor-status",
  propertySlug: "status",
  definition: "whether a floor's task is still open or met",
  values: ["active", "complete"],
  types: "ts",
} as const satisfies SelectProperty
