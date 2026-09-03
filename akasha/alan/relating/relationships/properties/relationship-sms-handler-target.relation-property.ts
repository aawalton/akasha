import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipSmsHandlerTarget = Slug

export const relationshipSmsHandlerTarget = {
  id: "01a0658a-f4df-7086-9fdb-c105a898b627",
  pageTypeSlug: "relation-property",
  slug: "relationship-sms-handler-target",
  propertySlug: "relationship-sms-handler-target",
  definition: "the handler seat a text from this person is routed to",
  targetPageTypeSlug: "page-type/person",
} as const satisfies RelationProperty
