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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name in lower kebab case is written in this format by raising what follows each `-`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `-` is dropped only where a lowercase ascii letter or an ascii digit follows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `-` anything else follows stays where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A letter outside ascii is kept as the name spells it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key from outside akasha is folded into this format rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "In a folded key, a run of characters that are no ascii letter or digit parts two words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folded key keeps no empty word, so a stray `-` leaves nothing behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A letter outside ascii parts words in a folded key and is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folded key's first word has its own capital lowered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A key with no ascii letter and no ascii digit is folded to nothing.",
    },
  ],
} as const satisfies NameFormat
