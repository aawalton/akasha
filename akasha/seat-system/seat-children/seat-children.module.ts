import type { Module } from "@akasha/code-system/module"

export const seatChildren = {
  id: "01a06867-7fc9-7003-a718-93571d4377aa",
  pageTypeSlug: "module",
  slug: "seat-children",
  definition: "the seats standing under one seat, and how many of them somebody is present in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's children are the present seats whose principal is that seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat standing under nobody is nobody's child.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat nobody is present in is nobody's child, because the count is of live children.",
    },
    {
      invariantKind: "departure",
      statement: "The count is written to the caller's output when this file is what was run.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming no seat writes zero rather than reading the roster.",
    },
  ],
} as const satisfies Module
