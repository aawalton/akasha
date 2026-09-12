import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatStatedNameRefusal = {
  id: "01a0686d-9d5e-7012-94c3-843ea0bdf815",
  type: "module",
  slug: "seat-stated-name-refusal",
  definition: "the refusal a seat start meets when it types a name beside the attributes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat's name is composed from the seat's attributes rather than typed beside those attributes.",
    },
    {
      invariantKind: "departure",
      statement: "What this reads is the refusals the one reader gave rather than the call.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal naming a word is that typed name wherever the word sits.",
    },
    {
      invariantKind: "departure",
      statement: "A call refused more than once is a mistyped flag rather than a name.",
    },
    {
      invariantKind: "absence",
      statement: "A refusal naming a flag is no typed name.",
    },
    {
      invariantKind: "absence",
      statement: "A refusal naming an empty word is no typed name.",
    },
    {
      invariantKind: "departure",
      statement: "A call refused nothing types no name.",
    },
  ],
} as const satisfies Module
