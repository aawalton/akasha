import type { TextProperty } from "@akasha/pages-system/text-property"

export type ToDoSlug = string

export const toDoSlug = {
  id: "01a05fd8-c30f-7596-9f3a-87a4dbea614a",
  pageTypeSlug: "text-property",
  slug: "to-do-slug",
  propertySlug: "to-do-slug",
  definition: "the to-do a round finished",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a to-do.",
    },
    {
      invariantKind: "departure",
      statement: "A round outlives its to-do.",
    },
    {
      invariantKind: "departure",
      statement: "A round may name a to-do that is gone.",
    },
  ],
} as const satisfies TextProperty
