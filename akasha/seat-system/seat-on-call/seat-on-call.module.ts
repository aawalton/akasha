import type { Module } from "@akasha/code-system/module"

export const seatOnCall = {
  id: "01a06949-b281-7ac9-9029-67b66a0efb23",
  pageTypeSlug: "module",
  slug: "seat-on-call",
  definition: "whether a seat is on call, read off its page, with the line that reports it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is on call only where its page holds true under the on-call key.",
    },
    {
      invariantKind: "departure",
      statement: "Anything other than true under that key reads as not on call.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no page in akasha reads as not on call.",
    },
    {
      invariantKind: "departure",
      statement: "The reported line pads the key name to eight columns before the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that is not on call is reported as none stated rather than as blank.",
    },
  ],
} as const satisfies Module
