import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const dropSources = {
  id: "01a05fd1-d439-7027-bdca-1804e14d6caf",
  type: "page-type/text-property",
  slug: "drop-sources",
  propertySlug: "drop-sources",
  definition: "the daily errands that drop a style's motif pages",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a scribing source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every errand a style drops from.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
