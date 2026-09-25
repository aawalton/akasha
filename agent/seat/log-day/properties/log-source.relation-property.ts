import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const logSource = {
  id: "01a0657c-cb14-750f-8488-9fcedbe02a80",
  type: "page-type/relation-property",
  slug: "log-source",
  propertySlug: "source",
  definition: "the process that writes a log",
  targetPageType: "page-type/log-source",
  types: "ts",
} as const satisfies RelationProperty
