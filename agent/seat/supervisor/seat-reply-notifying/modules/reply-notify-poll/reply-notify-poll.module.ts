import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const replyNotifyPoll = {
  id: "01a16f80-7143-7dd2-8007-1bb06f10176a",
  type: "page-type/module",
  slug: "reply-notify-poll",
  definition: "a seat's finished reply pushed on the beat that finds it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply is the agent's last words once the seat's turn has ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply is pushed once, known by the id of the line holding its words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last reply there when a supervisor first finds its agent is not pushed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push is titled with the seat's role and carries the reply's opening words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push links to the seat's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person the push could not reach leaves the other persons pushed all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat still running is not begun again.",
    },
  ],
  createdAt: "2026-10-24T20:00:51.010Z",
  updatedAt: "2026-10-24T20:00:51.010Z",
} as const satisfies Module
