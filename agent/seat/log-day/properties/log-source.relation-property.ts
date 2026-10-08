import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const logSource = {
  id: "01a0657c-cb14-750f-8488-9fcedbe02a80",
  type: "page-type/relation-property",
  slug: "log-source",
  propertySlug: "source",
  definition: "the process that writes a log",
  targetPageType: "page-type/log-source",
  types: "ts",
  createdAt: "2026-09-03T04:17:52.404Z",
  updatedAt: "2026-09-25T17:57:30.000Z",
} as const satisfies RelationProperty
