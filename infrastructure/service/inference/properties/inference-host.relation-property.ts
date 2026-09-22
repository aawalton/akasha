import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const inferenceHost = {
  id: "01a09094-7525-73c0-bc06-d3cdd15b053b",
  type: "page-type/relation-property",
  slug: "inference-host",
  propertySlug: "host",
  definition: "the machine outside the cluster a service runs on",
  targetPageType: "page-type/host",
  types: "ts",
} as const satisfies RelationProperty
