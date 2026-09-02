import type { TextProperty } from "@akasha/pages-system/text-property"

export type SkillType = string

export const skillType = {
  id: "01a05fba-ce3b-7869-b428-d3dd2f8703d7",
  pageTypeSlug: "text-property",
  slug: "skill-type",
  propertySlug: "skill-type",
  definition: "the sort of skill a page is about",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to  a skill type." },
  ],
} as const satisfies TextProperty
