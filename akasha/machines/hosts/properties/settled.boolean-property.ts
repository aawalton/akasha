import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Settled = boolean

export const settled = {
  id: "01a06590-e94f-7a1d-8e8a-4d92df41e38f",
  pageTypeSlug: "boolean-property",
  slug: "settled",
  propertySlug: "settled",
  definition: "whether what a thing is has stopped moving",
} as const satisfies BooleanProperty
