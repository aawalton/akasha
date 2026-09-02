import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Minutes = number

export const minutes = {
  id: "01a06240-340f-7004-9348-ced064f45785",
  pageTypeSlug: "number-property",
  slug: "minutes",
  propertySlug: "minutes",
  definition: "how long a track runs, in minutes",
  max: null,
} as const satisfies NumberProperty
