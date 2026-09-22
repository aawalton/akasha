import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const parseSaidText = {
  id: "01a0c9d5-9f55-7000-a597-e77b26ef4420",
  type: "page-type/module",
  slug: "parse-said-text",
  definition: "the text a value holds, where that value holds any text at all",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value holding the empty string holds no text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value holding nothing holds no text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Holding no text is answered as nothing rather than as the empty string.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here trims what surrounds the text.",
    },
  ],
} as const satisfies Module
