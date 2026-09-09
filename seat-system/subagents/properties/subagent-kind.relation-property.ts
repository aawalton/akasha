import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type SubagentKind = Slug

export const subagentKind = {
  id: "01a06d81-1aaf-767b-a25d-951b643a1247",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "subagent-kind",
  propertySlug: "subagent-kind",
  definition: "the kind a subagent was dispatched as",
  targetPageType: "page-type/subagent-kind",
} as const satisfies RelationProperty
