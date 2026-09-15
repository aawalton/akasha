import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayMessagesTotalling = {
  id: "01a082e7-25cd-7547-840c-7cd58dad9c8c",
  type: "module",
  slug: "day-messages-totalling",
  definition: "how many messages each persona was written over a run of days",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every persona is counted from 2026-08-08 and from no day earlier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day named is itself left out of the days before that day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One day alone is taken by its date whether counting began by then or not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A date is compared as text rather than as a date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no count of its own is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona counted on no day is in no total rather than in a total of zero.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a count into points.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
