import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoSkillLineId = number

export const esoSkillLineId = {
  id: "01a05fca-cb82-7627-a8fb-d4d9d4a31dde",
  pageTypeSlug: "number-property",
  slug: "eso-skill-line-id",
  propertySlug: "eso-skill-line-id",
  definition: "the number The Elder Scrolls Online names a skill line by",
  max: null,
} as const satisfies NumberProperty
