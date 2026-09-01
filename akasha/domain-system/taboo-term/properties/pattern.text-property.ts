import type { TextProperty } from "@akasha/pages-system/text-property"

export type Pattern = string

export const pattern = {
  id: "01a05950-57fe-7e42-81cf-987da9b05f9e",
  pageTypeSlug: "text-property",
  slug: "pattern",
  propertySlug: "pattern",
  definition: "the regular expression that finds a taboo term in changed text",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pattern is matched without regard to case.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pattern is matched against a copy of the added text split at its camelCase seams as well as against the added text.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern therefore needs no case of its own to reach inside a camelCase name.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern narrows only to leave out what the term never means.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern that does not compile is no pattern.",
    },
  ],
} as const satisfies TextProperty
