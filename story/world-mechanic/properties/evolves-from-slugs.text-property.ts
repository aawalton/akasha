import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const evolvesFromSlugs = {
  id: "01a0655d-ac15-7900-8205-60508a002f32",
  type: "page-type/text-property",
  slug: "evolves-from-slugs",
  propertySlug: "evolves-from-slugs",
  definition: "every mechanic this one is reached from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a mechanic of the same page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An evolution names a mechanic of the kind the mechanic evolving is.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
