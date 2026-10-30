import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const relationshipSmsHandlerTarget = {
  id: "01a06594-c6e2-7aa9-a606-4a5b660b0499",
  type: "page-type/relation-property",
  slug: "relationship-sms-handler-target",
  propertySlug: "relationship-sms-handler-target",
  definition: "the person whose handler handles a text this person sends",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-09-03T04:44:04.194Z",
  updatedAt: "2026-10-30T16:23:20.541Z",
} as const satisfies RelationProperty
