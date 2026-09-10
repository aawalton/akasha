import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const relationshipSmsHandlerTarget = {
  id: "01a06594-c6e2-7aa9-a606-4a5b660b0499",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "relationship-sms-handler-target",
  propertySlug: "relationship-sms-handler-target",
  definition: "the handler seat a text from this person is routed to",
  targetPageType: "page-type/person",
  types: "ts",
} as const satisfies RelationProperty
