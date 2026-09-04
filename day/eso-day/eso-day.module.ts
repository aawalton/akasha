import type { Module } from "../../code-system/modules/module.page-type.ts"

export const esoDay = {
  id: "01a05c77-31e6-7a9f-9805-d1c81725dd03",
  pageTypeSlug: "module",
  slug: "eso-day",
  definition: "the day counted from six in the morning in New York, and the span one covers",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day is anchored at noon rather than at the reset that opens the day.",
    },
    {
      invariantKind: "departure",
      statement:
        "A window's bounds are each worked out against the offset they themselves land in.",
    },
    {
      invariantKind: "departure",
      statement: "A day that will not parse answers with a window of no length at the epoch.",
    },
    {
      invariantKind: "departure",
      statement: "Two days are differenced as calendar days rather than as elapsed hours.",
    },
  ],
} as const satisfies Module
