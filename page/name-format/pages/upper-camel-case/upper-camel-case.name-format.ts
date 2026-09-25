import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const upperCamelCase = {
  id: "01a04eba-7459-7eca-8601-1a20dbb5a53c",
  type: "page-type/name-format",
  slug: "upper-camel-case",
  definition: "a name format joining words with nothing between, every word starting capital",
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
