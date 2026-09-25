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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name in lower camel case is written in this format with a `-` before each capital, lowered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capital opening the name takes a `-` before it as any other capital does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of capitals is parted letter by letter rather than read as one word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second writer keeps a run of capitals whole as one word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That writer puts a `-` where a capital follows a lowercase ascii letter or an ascii digit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That writer puts a `-` between two capitals where the second opens a lowercase word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That writer keeps a one-letter word a word of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "That writer parts a run of capitals ending in a lowercase letter before its last capital.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That writer lowers every letter, whatever joins the words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the first writer undoes lower camel case for every name.",
    },
  ],
} as const satisfies NameFormat
