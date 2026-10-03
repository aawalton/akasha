import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const beatScenePlace = {
  id: "01a1023a-d04b-7461-9d42-a1f7329dab3c",
  type: "page-type/relation-property",
  slug: "beat-scene-place",
  propertySlug: "place",
  definition: "the place a beat happens in, where it moves the scene",
  targetPageType: "page-type/place",
  types: "ts",
} as const satisfies RelationProperty
