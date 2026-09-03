import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type EvolvesToSlugs = List<string>

export const evolvesToSlugs = {
  id: "01a0655d-ac15-78e3-a569-51e32648b88c",
  pageTypeSlug: "text-property",
  slug: "evolves-to-slugs",
  propertySlug: "evolves-to-slugs",
  definition: "every mechanic this one reaches",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a mechanic of the same page type.",
    },
    {
      invariantKind: "departure",
      statement: "An evolution names a mechanic of the kind the mechanic evolving is.",
    },
  ],
} as const satisfies TextProperty
