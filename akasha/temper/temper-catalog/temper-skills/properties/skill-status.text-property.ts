import type { TextProperty } from "@akasha/pages-system/text-property"

export type SkillStatus = string

export const skillStatus = {
  id: "01a05fca-cb87-719f-b348-33ad77e63005",
  pageTypeSlug: "text-property",
  slug: "skill-status",
  propertySlug: "status",
  definition: "how far temper works out what a skill does",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
