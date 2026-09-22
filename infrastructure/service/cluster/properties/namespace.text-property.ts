import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const namespace = {
  id: "01a05a41-58c4-75fd-a1fe-fc3595ae4a50",
  type: "page-type/text-property",
  slug: "namespace",
  propertySlug: "namespace",
  definition: "a resource's part of the cluster",
  maxLength: 63,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
