import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const stageOfPartnersBond = {
  id: "01a0de4b-e1c6-7d5c-9694-5b12786206d3",
  type: "page-type/relation-property",
  slug: "stage-of-partners-bond",
  propertySlug: "stage",
  definition: "the stage a bond in Partners has reached",
  targetPageType: "page-type/partners-bond-stage",
  types: "ts",
} as const satisfies RelationProperty
