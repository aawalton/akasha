import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBarSending = {
  id: "01a0d48a-8a47-745b-8d92-693cc1ecc076",
  type: "page-type/module",
  slug: "action-bar-sending",
  definition: "an action a game's action bar sends, and the action draft it reads back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is sent as typed, with the game it is for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer saying the caller is not signed in reads as signed out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer nothing can be read out of says the game did not respond.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read of the action draft that fails reads as nothing known.",
    },
  ],
  createdAt: "2026-09-24T17:50:44.295Z",
  updatedAt: "2026-10-27T22:10:37.219Z",
} as const satisfies Module
