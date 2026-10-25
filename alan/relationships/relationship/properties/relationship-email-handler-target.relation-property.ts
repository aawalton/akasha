import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const relationshipEmailHandlerTarget = {
  id: "01a17480-d4d1-7d75-b2e8-11d45cb8bb14",
  type: "page-type/relation-property",
  slug: "relationship-email-handler-target",
  propertySlug: "relationship-email-handler-target",
  definition: "the handler seat an email from this person to a persona's address is routed to",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-10-25T19:19:22.576Z",
  updatedAt: "2026-10-25T19:19:22.576Z",
} as const satisfies RelationProperty
