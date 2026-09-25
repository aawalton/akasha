import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStatedNameRefusal = {
  id: "01a0686d-9d5e-7012-94c3-843ea0bdf815",
  type: "page-type/module",
  slug: "seat-stated-name-refusal",
  definition: "the refusal of a name a seat start types",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's name is composed from the seat's attributes rather than typed beside those attributes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What this reads is the refusals the one reader gave rather than the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One refusal naming a word is that typed name wherever the word sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call refused more than once is a mistyped flag rather than a name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A refusal naming a flag is no typed name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A refusal naming an empty word is no typed name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call refused nothing types no name.",
    },
  ],
} as const satisfies Module
