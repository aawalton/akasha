import type { Module } from "@akasha/code-system/module"

export const seatAnswering = {
  id: "01a06867-7fc9-7004-a4e4-ce9bc9ecc0fd",
  pageTypeSlug: "module",
  slug: "seat-answering",
  definition: "the rule binding who a seat answers as to who a seat answers to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat answers as somebody only where the one it answers to is a person.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat of a person answers as somebody.",
    },
    {
      invariantKind: "departure",
      statement: "A persona left at the default answers for nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A seat working for another agent takes no persona.",
    },
    {
      invariantKind: "departure",
      statement: "A handler takes its persona and its principal from the person it serves.",
    },
    {
      invariantKind: "departure",
      statement: "A seat in neither state and a seat in both states are each allowed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes what a seat states.",
    },
  ],
} as const satisfies Module
