import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const titleCase = {
  id: "01a04eba-7459-7314-a8c6-dc565526fb11",
  type: "page-type/name-format",
  slug: "title-case",
  definition: "a name format separating words with spaces, every important word starting capital",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The first word and the last are taken as important.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Which word between the first and the last is important cannot be read off the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lower word between the first and the last is let through.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name padded or doubly spaced is not written in title case.",
    },
  ],
} as const satisfies NameFormat
