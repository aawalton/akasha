import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const typingPerson = {
  id: "01a16ffe-f46d-7856-b0a0-56cf3140c45c",
  type: "page-type/relation-property",
  slug: "typing-person",
  propertySlug: "person",
  definition: "a person typing a message to a seat",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-10-24T22:19:02.125Z",
  updatedAt: "2026-10-24T22:19:02.125Z",
} as const satisfies RelationProperty
