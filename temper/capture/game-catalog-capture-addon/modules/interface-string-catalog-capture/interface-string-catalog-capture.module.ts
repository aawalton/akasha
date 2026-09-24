import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const interfaceStringCatalogCapture = {
  id: "01a0d415-d3c7-7670-938f-b017b96a773c",
  type: "page-type/module",
  slug: "interface-string-catalog-capture",
  definition: "the collector reading the text the game gives each of its interface strings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game publishes each string's name and number and none of its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every global the game names as a string and holds as a number is asked for its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string the game answers with no text is passed over.",
    },
  ],
} as const satisfies Module
