import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type EvolvesFromSlugs = List<string>

export const evolvesFromSlugs = {
  id: "01a0655d-ac15-7900-8205-60508a002f32",
  pageTypeSlug: "text-property",
  slug: "evolves-from-slugs",
  propertySlug: "evolves-from-slugs",
  definition: "every mechanic this one is reached from",
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
