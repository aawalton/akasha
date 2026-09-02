import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type FirstListen = boolean

export const firstListen = {
  id: "01a06240-340f-7005-939a-88252e0e69fc",
  pageTypeSlug: "boolean-property",
  slug: "first-listen",
  propertySlug: "first-listen",
  definition: "whether a play was the first play of its track",
} as const satisfies BooleanProperty
