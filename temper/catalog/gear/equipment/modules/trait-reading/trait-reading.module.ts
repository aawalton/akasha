import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traitReading = {
  id: "01a0e0f3-80ea-7bb5-8c71-3c713f08bb69",
  type: "page-type/module",
  slug: "trait-reading",
  definition: "the armor, weapon and jewelry traits and what each is worth, read from their pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The traits are read from the trait pages in hash-place order and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's worth at a quality is the grade under it naming the same stat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait with one grade at a quality is worth that grade whatever stat it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect keeps the sign its page states and takes its size from the grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's game number is read from the trait map pages.",
    },
  ],
} as const satisfies Module
