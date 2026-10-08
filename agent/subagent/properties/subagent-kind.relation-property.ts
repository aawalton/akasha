import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const subagentKind = {
  id: "01a06d81-1aaf-767b-a25d-951b643a1247",
  type: "page-type/relation-property",
  slug: "subagent-kind",
  propertySlug: "subagent-kind",
  definition: "the kind a subagent was dispatched as",
  targetPageType: "page-type/subagent-kind",
  types: "ts",
  createdAt: "2026-09-04T17:39:32.655Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
