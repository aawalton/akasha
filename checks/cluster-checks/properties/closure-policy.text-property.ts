import type { TextProperty } from "@akasha/pages-system/text-property"

export type ClosurePolicy = string

export const closurePolicy = {
  id: "01a0680b-1003-7d3d-933d-d98ba4b50656",
  pageTypeSlug: "text-property",
  slug: "closure-policy",
  propertySlug: "closure-policy",
  definition: "how the files a check reads are worked out",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
