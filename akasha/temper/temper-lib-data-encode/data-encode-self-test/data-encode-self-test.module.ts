import type { Module } from "@akasha/code-system/module"

export const dataEncodeSelfTest = {
  id: "01a06061-96a1-75e4-ac25-398ca505ef1b",
  pageTypeSlug: "module",
  slug: "data-encode-self-test",
  definition: "a table encoded and decoded again to prove the two halves agree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The test table holds a value of every kind the encoder handles.",
    },
    {
      invariantKind: "departure",
      statement: "The test runs once for each way a dictionary may be given.",
    },
    {
      invariantKind: "departure",
      statement: "Two numbers are judged equal by the text the game gives for the two numbers.",
    },
    {
      invariantKind: "departure",
      statement: "The outcome is logged rather than raised.",
    },
  ],
} as const satisfies Module
