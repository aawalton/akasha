import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const lowerCamelCase = {
  id: "01a04eba-7459-7514-a7a9-88538edfa887",
  type: "page-type/name-format",
  slug: "lower-camel-case",
  definition:
    "a name format joining words with nothing between, every word but the first starting capital",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A capital opens a word and a word may be one letter.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Whether an acronym is one word or many words cannot be read off the name.",
    },
  ],
} as const satisfies NameFormat
