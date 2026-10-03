import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const beatSceneBeat = {
  id: "01a1023a-d04b-7cc0-8cae-dd204ac253e8",
  type: "page-type/number-property",
  slug: "beat-scene-beat",
  propertySlug: "beat",
  definition: "the number of the beat a scene record belongs to, counting the first beat as 1",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
