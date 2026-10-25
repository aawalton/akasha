import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorPollAgentAction = {
  id: "01a0687b-aa81-7000-ada8-b1a18075e043",
  type: "page-type/module",
  slug: "supervisor-poll-agent-action",
  definition: "reading the action a seat has been asked to take",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The actions a seat can be asked to take are read from the supervisor-action pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each action is named by the slug of the page imported for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A regret is read every second rather than on the heartbeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The heartbeat reads every action, a regret among them.",
    },
  ],
  createdAt: "2026-09-03T18:15:30.177Z",
  updatedAt: "2026-10-25T02:51:45.849Z",
} as const satisfies Module
