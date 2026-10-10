import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationWords = {
  id: "01a11cee-1da4-7771-9eed-7edb75214b4c",
  type: "page-type/module",
  slug: "narration-words",
  definition: "a written word the voice would misread, handed on as the words it means",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Roman numeral of two letters or more after a capitalised name is said as an ordinal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Roman numeral after a counting word, such as War or Episode, is said as a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lone capital, and a numeral after a lowercase word, is said as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shouted word is handed on lowercase with Kokoro's strongest stress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shouted word is one of four letters or more, or a short word misaki spells out as a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A capital word with no vowel, or of under four letters otherwise, is said as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word in jumbled case, as an Aberration writes, is handed on lowered past its first letter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Capitalised words run together, a brand, a unit or a run of words with no spaces stay written.",
    },
  ],
  createdAt: "2026-10-08T19:12:09.635Z",
  updatedAt: "2026-10-10T15:43:18.979Z",
} as const satisfies Module
