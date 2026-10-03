import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const beatSceneLeave = {
  id: "01a1023a-d04b-7a05-90db-33983a52fc43",
  type: "page-type/multi-relation-property",
  slug: "beat-scene-leave",
  propertySlug: "leave",
  definition: "the characters who go from a beat's place in that beat",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies MultiRelationProperty
