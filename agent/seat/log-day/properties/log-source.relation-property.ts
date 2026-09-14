import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const logSource = {
  id: "01a0657c-cb14-750f-8488-9fcedbe02a80",
  type: "relation-property",
  slug: "log-source",
  propertySlug: "source",
  definition: "the stream a day of lines was written by",
  targetPageType: "page-type/log-source",
  types: "ts",
} as const satisfies RelationProperty
