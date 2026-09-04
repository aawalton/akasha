import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type ShortList = boolean

export const shortList = {
  id: "01a06598-68c8-7a73-a878-f22b5a91b093",
  pageTypeSlug: "boolean-property",
  slug: "short-list",
  propertySlug: "short-list",
  definition: "whether this stayed on the list of what Alan would buy",
} as const satisfies BooleanProperty
