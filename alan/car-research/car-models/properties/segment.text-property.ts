import type { TextProperty } from "@akasha/pages/text-property"

export type Segment = string

export const segment = {
  id: "01a0659a-4bc5-736f-9221-add2ef2369c4",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "segment",
  propertySlug: "segment",
  definition: "the size and price bracket the model sells in",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
