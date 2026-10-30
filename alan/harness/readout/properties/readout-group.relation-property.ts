import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const readoutGroup = {
  id: "01a14f32-dce0-7481-b235-42c6a2fdb2a6",
  type: "page-type/relation-property",
  slug: "readout-group",
  propertySlug: "group",
  definition: "the group a readout is shown in",
  targetPageType: "page-type/readout-group",
  types: "ts",
  createdAt: "2026-10-18T13:28:15.838Z",
  updatedAt: "2026-10-30T16:11:45.129Z",
} as const satisfies RelationProperty
