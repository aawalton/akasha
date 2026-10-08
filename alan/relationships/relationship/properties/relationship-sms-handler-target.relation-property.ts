import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const relationshipSmsHandlerTarget = {
  id: "01a06594-c6e2-7aa9-a606-4a5b660b0499",
  type: "page-type/relation-property",
  slug: "relationship-sms-handler-target",
  propertySlug: "relationship-sms-handler-target",
  definition: "the handler seat a text from this person is routed to",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-09-03T04:44:04.194Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationProperty
