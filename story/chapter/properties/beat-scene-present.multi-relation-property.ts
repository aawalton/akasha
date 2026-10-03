import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const beatScenePresent = {
  id: "01a1023a-d04c-75d9-b6fb-37a82d9c84fd",
  type: "page-type/multi-relation-property",
  slug: "beat-scene-present",
  propertySlug: "present",
  definition: "everyone at a beat's place, stated whole",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies MultiRelationProperty
