import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const titledAs = {
  id: "01a0c63a-a537-7b76-8461-838ca8ebcd02",
  type: "page-type/module",
  slug: "titled-as",
  definition: "the name a reader sees for the slug or key akasha files a value under",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dash and an underscore each part one word from the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each word is answered with its first letter raised and the rest as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text a slash qualifies is answered as what follows the last slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Empty text is answered as empty text.",
    },
  ],
} as const satisfies Module
