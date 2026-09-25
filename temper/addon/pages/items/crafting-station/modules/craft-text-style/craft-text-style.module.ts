import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftTextStyle = {
  id: "01a0da30-ff4e-7028-9642-e994a28eaed0",
  type: "page-type/module",
  slug: "craft-text-style",
  definition: "the crafting station's labels and buttons set in the shared text roles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A research label naming data is a heading, a time or a slot a number, and the rest body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button a crafting row makes in code is a tab in the body text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A research time is wide enough for a day count on one line.",
    },
  ],
} as const satisfies Module
