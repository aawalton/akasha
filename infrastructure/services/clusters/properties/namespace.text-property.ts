import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const namespace = {
  id: "01a05a41-58c4-75fd-a1fe-fc3595ae4a50",
  type: "text-property",
  slug: "namespace",
  propertySlug: "namespace",
  definition: "the part of the cluster a resource sits in",
  maxLength: 63,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
