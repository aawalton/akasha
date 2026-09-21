import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataEncodeSelfTest = {
  id: "01a06061-96a1-75e4-ac25-398ca505ef1b",
  type: "page-type/module",
  slug: "data-encode-self-test",
  definition: "a table encoded and decoded again to prove the two halves agree",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two numbers are judged equal by the text the game gives for the two numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcome is logged rather than raised.",
    },
  ],
} as const satisfies Module
