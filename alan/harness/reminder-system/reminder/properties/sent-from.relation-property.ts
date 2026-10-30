import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const sentFrom = {
  id: "01a05f42-d941-7003-93f9-14f2e4d582f1",
  type: "page-type/relation-property",
  slug: "sent-from",
  propertySlug: "from",
  definition: "the persona that sends a reminder",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-01T23:16:51.649Z",
  updatedAt: "2026-10-30T16:07:26.081Z",
} as const satisfies RelationProperty
