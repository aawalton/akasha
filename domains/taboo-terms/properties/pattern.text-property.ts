import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const pattern = {
  id: "01a05950-57fe-7e42-81cf-987da9b05f9e",
  type: "text-property",
  slug: "pattern",
  propertySlug: "pattern",
  definition: "the regular expression that finds a taboo term in changed text",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pattern is matched without regard to case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A pattern is matched against the added text as well as against a copy split at its camelCase seams.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pattern therefore needs no case of its own to reach inside a camelCase name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pattern narrows only to leave out the senses the term never means.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pattern that does not compile is no pattern.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
