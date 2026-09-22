import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const saidAs = {
  id: "01a09483-5529-7998-ad2c-461a3f347977",
  type: "page-type/select-property",
  slug: "said-as",
  propertySlug: "said-as",
  definition: "how a call fills an argument under a command",
  values: ["flag", "word", "flag-or-word"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating nothing here is filled at its flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument filled as a word alone is not taken at its flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names an argument filled as a word alone by its placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words fill the arguments taken as words in the order the page states them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a call fills an argument belongs to the command rather than to the argument.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
