import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatConversationHearing = {
  id: "01a17006-627a-7d02-aa55-f557d03b7e20",
  type: "page-type/module",
  slug: "seat-conversation-hearing",
  definition: "how a seat's page hears the seat's conversation and turn state",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A conversation is asked for again whenever the seat's page changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A conversation is asked for on a timer while no watch on the page is live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask made while one is in flight is made once that one answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused ask keeps the conversation already heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry of a kind not drawn is dropped.",
    },
  ],
  createdAt: "2026-10-24T22:27:09.050Z",
  updatedAt: "2026-10-24T22:27:09.050Z",
} as const satisfies Module
