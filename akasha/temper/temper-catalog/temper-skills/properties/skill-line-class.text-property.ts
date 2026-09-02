import type { TextProperty } from "@akasha/pages-system/text-property"

export type SkillLineClass = string

export const skillLineClass = {
  id: "01a05fca-cb87-7a9a-9dda-95916e9f73d7",
  pageTypeSlug: "text-property",
  slug: "skill-line-class",
  propertySlug: "class",
  definition: "the class a skill line belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a class.",
    },
  ],
} as const satisfies TextProperty
