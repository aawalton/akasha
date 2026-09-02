import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoRaceId = number

export const esoRaceId = {
  id: "01a05fc4-7a92-7d70-af85-78a934e9fa71",
  pageTypeSlug: "number-property",
  slug: "eso-race-id",
  propertySlug: "eso-race-id",
  definition: "the number The Elder Scrolls Online names a race by",
  max: null,
} as const satisfies NumberProperty
