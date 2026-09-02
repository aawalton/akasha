import type { TextProperty } from "@akasha/pages-system/text-property"

export type Namespace = string

export const namespace = {
  id: "01a05a41-58c4-75fd-a1fe-fc3595ae4a50",
  pageTypeSlug: "text-property",
  slug: "namespace",
  propertySlug: "namespace",
  definition: "the part of the cluster a resource stands in",
  max: 63,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
