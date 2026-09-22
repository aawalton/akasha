import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const skillEffectType = {
  id: "01a06193-6c9c-7634-848c-8d6bb62228f6",
  type: "page-type/text-property",
  slug: "skill-effect-type",
  propertySlug: "type",
  definition: "what a thing a companion's skill does is a case of",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
