import type { TextProperty } from "@akasha/pages-system/text-property"

export type NodeKind = string

export const nodeKind = {
  id: "01a0680b-1002-7be6-b4cc-85c668878da6",
  pageTypeSlug: "text-property",
  slug: "node-kind",
  propertySlug: "node-kind",
  definition: "the sort of tree node a dispatch names",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
