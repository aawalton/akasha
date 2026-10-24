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
      statement: "Cancel is offered only on a message the person reading sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cancel is offered on a message sent and not yet taken by the seat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No Cancel is offered once the reply to the message has finished.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Cancel acts at once, before the route answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message being cancelled is no longer drawn, nor anything said after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message being cancelled hands its words and images back to the composer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message cancelled stays undrawn for a minute while the seat rewinds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Cancel refused draws the message again and takes back the words handed back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Cancel refused says why in the words the route refused it with, for a moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Cancel refused because the seat took the message names the seat as having it.",
    },
  ],
  createdAt: "2026-10-24T22:42:59.005Z",
  updatedAt: "2026-10-24T23:27:07.234Z",
} as const satisfies Module
