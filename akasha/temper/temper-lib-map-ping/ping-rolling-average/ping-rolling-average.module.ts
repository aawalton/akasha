import type { Module } from "@akasha/code-system/module"

export const pingRollingAverage = {
  id: "01a0605f-6260-7684-a583-fe4d1368b346",
  pageTypeSlug: "module",
  slug: "ping-rolling-average",
  definition: "the count of pings sent over a recent stretch of time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bucket the current moment falls in is left out of the average.",
    },
    {
      invariantKind: "departure",
      statement: "A bucket the clock has passed is zeroed before the next count.",
    },
  ],
} as const satisfies Module
