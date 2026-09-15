import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const lowerKebabCase = {
  id: "01a04eba-7459-71b8-9356-78cfec88c104",
  type: "page-type/name-format",
  slug: "lower-kebab-case",
  definition: "a name format joining words with hyphens, all letters lower",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A digit sits inside a word rather than between words.",
    },
  ],
} as const satisfies NameFormat
