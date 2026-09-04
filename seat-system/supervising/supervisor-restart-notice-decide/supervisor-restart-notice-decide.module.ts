import type { Module } from "@akasha/code-system/module"

export const supervisorRestartNoticeDecide = {
  id: "01a0686d-9d5e-7007-a87f-ae0387e800f7",
  pageTypeSlug: "module",
  slug: "supervisor-restart-notice-decide",
  definition:
    "what a restarting seat is told, and whether it is told on the spawn line or the rail",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restart under maintenance is deferred and told on the rail.",
    },
    {
      invariantKind: "departure",
      statement: "A restart waiting on a re-exec is told on the rail rather than the spawn line.",
    },
    {
      invariantKind: "departure",
      statement: "An interrupt message stated with the restart is what the seat is told.",
    },
    {
      invariantKind: "departure",
      statement: "The recovery clause follows every notice unless it is empty.",
    },
  ],
} as const satisfies Module
