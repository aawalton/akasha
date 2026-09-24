import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const interfaceStringCatalog = {
  id: "01a0d415-b913-7f5a-8c9e-4d9aef5b8f80",
  type: "page-type/module",
  slug: "interface-string-catalog",
  definition: "the shape the text the game gives each of its interface strings is written in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string's text is kept under the name the game gives that string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the game answers with is kept beside the text it gave.",
    },
  ],
} as const satisfies Module
