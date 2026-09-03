import type { TextProperty } from "@akasha/pages-system/text-property"

export type Continuity = string

export const continuity = {
  id: "01a06577-f385-7f47-8c46-429d378841ca",
  pageTypeSlug: "text-property",
  slug: "continuity",
  propertySlug: "continuity",
  definition: "what a story holds constant between its chapters",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
