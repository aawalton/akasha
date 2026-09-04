import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipSmsHandlerTarget = Slug

export const relationshipSmsHandlerTarget = {
  id: "01a06594-c6e2-7aa9-a606-4a5b660b0499",
  pageTypeSlug: "relation-property",
  slug: "relationship-sms-handler-target",
  propertySlug: "relationship-sms-handler-target",
  definition: "the handler seat a text from this person is routed to",
  targetPageTypeSlug: "page-type/person",
} as const satisfies RelationProperty
