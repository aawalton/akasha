import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageAgentTools = {
  id: "01a0695a-d2ea-7719-a70d-79d222213a7b",
  type: "page-type/module",
  slug: "agent-message-agent-tools",
  definition: "how code sends the messages that wait for a seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's messages are first offered once its session says the channel is initialized.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A session drops unread a message offered before it has taken up the channel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn notice whose turn has moved past it is taken without being sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn notice is weighed as it is offered, so a notice let go is weighed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn notice is weighed by a fresh run of the checkout's own judging.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No notice is weighed by code the seat has held since it began.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judging run that fails weighs the notice in this process instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice taken without being sent is said on the seat's supervisor console.",
    },
  ],
  createdAt: "2026-09-03T22:19:15.050Z",
  updatedAt: "2026-10-28T00:06:41.119Z",
} as const satisfies Module
