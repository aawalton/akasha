import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const beatSceneArrive = {
  id: "01a1023a-d04a-725d-95cd-fe96a9fc5507",
  type: "page-type/multi-relation-property",
  slug: "beat-scene-arrive",
  propertySlug: "arrive",
  definition: "the characters who come to a beat's place in that beat",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies MultiRelationProperty
