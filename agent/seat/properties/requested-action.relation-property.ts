import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const requestedAction = {
  id: "01a0542c-d18d-723c-8b98-1841c0eeef14",
  type: "page-type/relation-property",
  slug: "requested-action",
  propertySlug: "action",
  definition: "what a seat's supervisor has to do",
  targetPageType: "page-type/supervisor-action",
  types: "ts",
  createdAt: "2026-08-30T19:36:58.509Z",
  updatedAt: "2026-09-25T18:07:07.000Z",
} as const satisfies RelationProperty
