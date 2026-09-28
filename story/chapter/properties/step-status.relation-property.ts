import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const stepStatus = {
  id: "01a0dead-c0d9-76e9-b3f0-ef5d86237581",
  type: "page-type/relation-property",
  slug: "step-status",
  propertySlug: "step-status",
  definition: "whose move a turn or a written chapter being made waits on",
  targetPageType: "page-type/step-status",
  types: "ts",
} as const satisfies RelationProperty
