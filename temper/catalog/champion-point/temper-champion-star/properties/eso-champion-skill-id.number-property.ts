import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoChampionSkillId = {
  id: "01a0e135-d98c-7115-b972-d12cc3f800e2",
  type: "page-type/number-property",
  slug: "eso-champion-skill-id",
  propertySlug: "eso-champion-skill-id",
  definition: "the number The Elder Scrolls Online gives a champion star, or zero for no star",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
