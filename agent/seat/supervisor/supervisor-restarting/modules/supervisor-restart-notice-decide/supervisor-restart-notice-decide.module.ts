import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRestartNoticeDecide = {
  id: "01a0686d-9d5e-7007-a87f-ae0387e800f7",
  type: "page-type/module",
  slug: "supervisor-restart-notice-decide",
  definition:
    "what a restarting seat is told, and whether it is told on the spawn line or the rail",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart under maintenance is deferred and told on the rail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart waiting on a re-exec is told on the rail rather than the spawn line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An interrupt message stated with the restart is the notice the seat is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recovery clause follows every notice unless that clause is empty.",
    },
  ],
} as const satisfies Module
