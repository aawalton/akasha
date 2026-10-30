import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentRestartNoticeDecide = {
  id: "01a0686d-9d5e-7007-a87f-ae0387e800f7",
  type: "page-type/module",
  slug: "agent-restart-notice-decide",
  definition: "how code chooses the notice and the route for an agent restarted in a seat",
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
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-30T14:39:10.928Z",
} as const satisfies Module
