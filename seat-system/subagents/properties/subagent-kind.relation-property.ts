import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const subagentKind = {
  id: "01a06d81-1aaf-767b-a25d-951b643a1247",
  type: "relation-property",
  slug: "subagent-kind",
  propertySlug: "subagent-kind",
  definition: "the kind a subagent was dispatched as",
  targetPageType: "page-type/subagent-kind",
  types: "ts",
} as const satisfies RelationProperty
