import type { TextProperty } from "@akasha/pages-system/text-property"

export type NodeType = string

export const nodeType = {
  id: "01a05fcb-d655-73ba-a6da-f60c6c48e6b4",
  pageTypeSlug: "text-property",
  slug: "node-type",
  propertySlug: "node-type",
  definition: "which rank of the metric tree a node sits at",
  max: 20,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
