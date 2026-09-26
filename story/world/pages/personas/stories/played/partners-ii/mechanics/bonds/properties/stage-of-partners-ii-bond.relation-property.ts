import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const stageOfPartnersIiBond = {
  id: "01a0de4f-393d-7aac-ba59-5ab541bc5812",
  type: "page-type/relation-property",
  slug: "stage-of-partners-ii-bond",
  propertySlug: "stage",
  definition: "the stage a bond in Partners II has reached",
  targetPageType: "page-type/partners-ii-bond-stage",
  types: "ts",
} as const satisfies RelationProperty
