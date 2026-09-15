import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatOnCall = {
  id: "01a06949-b281-7ac9-9029-67b66a0efb23",
  type: "page-type/module",
  slug: "seat-on-call",
  definition: "whether a seat is on call, read off its page",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is on call only where its page holds true under the on-call key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything other than true under that key reads as not on call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no page in akasha reads as not on call.",
    },
  ],
} as const satisfies Module
