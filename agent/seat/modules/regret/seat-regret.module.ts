import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRegret = {
  id: "01a17014-e13e-7bf5-bb99-5e7f8eb1cf86",
  type: "page-type/module",
  slug: "seat-regret",
  definition: "the part of a seat's page that takes back a message the seat is replying to",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Cancel is offered on the latest message a person said while the seat works.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cancel is offered only on a message this page sent.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No Cancel is offered once the reply to the message has finished.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A page loaded again offers no Cancel on what it sent before the load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message taken back is no longer drawn, nor anything said after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message taken back hands its words back to the composer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Cancel refused says why in the words the route refused it with.",
    },
  ],
  createdAt: "2026-10-24T22:42:59.005Z",
  updatedAt: "2026-10-24T22:42:59.005Z",
} as const satisfies Module
