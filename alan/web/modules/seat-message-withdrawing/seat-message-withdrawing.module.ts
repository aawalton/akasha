import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatMessageWithdrawing = {
  id: "01a17038-e2bb-75e8-98af-64de0f417a2f",
  type: "page-type/module",
  slug: "seat-message-withdrawing",
  definition: "a message a person takes back before the seat it was sent to has taken it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the person who sent a message takes it back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is taken back only from the seat it was sent to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message is taken back by claiming it as its seat would and taking its page away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of a take back and the seat taking the message at once, exactly one wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message claimed already, or whose page is gone, is answered as taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A take back the pages refuse is answered as taken where the message is claimed by then.",
    },
  ],
  createdAt: "2026-10-24T23:22:18.683Z",
  updatedAt: "2026-10-24T23:22:18.683Z",
} as const satisfies Module
