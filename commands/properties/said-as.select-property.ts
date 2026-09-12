import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const saidAs = {
  id: "01a09483-5529-7998-ad2c-461a3f347977",
  type: "select-property",
  slug: "said-as",
  propertySlug: "said-as",
  definition: "how a call fills an argument under one command",
  values: ["flag", "word", "flag-or-word"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry stating nothing here is filled at its flag.",
    },
    {
      invariantKind: "departure",
      statement: "An argument filled as a word alone is not taken at its flag.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names an argument filled as a word alone by its placeholder.",
    },
    {
      invariantKind: "departure",
      statement: "Words fill the arguments taken as words in the order the page states them.",
    },
    {
      invariantKind: "departure",
      statement: "How a call fills an argument belongs to the command rather than to the argument.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
