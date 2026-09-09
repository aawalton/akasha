import type { TextProperty } from "@akasha/pages/text-property"

export type Reason = string

export const reason = {
  id: "01a05da1-60fe-7007-b28f-f863cb3deabf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reason",
  propertySlug: "reason",
  definition: "the fact a sentence shape is refused on",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
