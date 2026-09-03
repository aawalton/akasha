import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Claimed = boolean

export const claimed = {
  id: "01a06558-a991-7120-bee3-994201ef685e",
  pageTypeSlug: "boolean-property",
  slug: "claimed",
  propertySlug: "claimed",
  definition: "whether a holder is read out of the text rather than stated by it",
} as const satisfies BooleanProperty
