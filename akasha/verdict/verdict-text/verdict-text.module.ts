import type { Module } from "../../code-system/modules/module.page-type.ts"

export const verdictText = {
  id: "01a05c87-a162-7009-8991-e7d36b476492",
  pageTypeSlug: "module",
  slug: "verdict-text",
  definition: "a judgement written out for a person to read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reach nothing declared reads as unmeasured.",
    },
    {
      invariantKind: "departure",
      statement: "A reach with nothing unexaminable reads as a bare count.",
    },
    {
      invariantKind: "departure",
      statement: "A finding naming no place reads as unattributed.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement of a kind this build cannot read is written out as unreadable.",
    },
  ],
} as const satisfies Module
