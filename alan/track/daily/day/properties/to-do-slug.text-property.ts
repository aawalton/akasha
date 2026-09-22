import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const toDoSlug = {
  id: "01a05fd8-c30f-7596-9f3a-87a4dbea614a",
  type: "page-type/text-property",
  slug: "to-do-slug",
  propertySlug: "to-do-slug",
  definition: "the to-do a round finished",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A round outlives its to-do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round may name a to-do that is gone.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
