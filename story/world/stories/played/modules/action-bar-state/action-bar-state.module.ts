import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBarState = {
  id: "01a0d48a-0758-724f-85b2-9b2412f0754f",
  type: "page-type/module",
  slug: "action-bar-state",
  definition: "what a game's action bar shows of the actions sent and the turn being made",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action sent is echoed at once, before the game has answered the send.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An echo goes once the bar's read after its write comes back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action's echo stays while the turn answering it is awaited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is awaited from an action sent until the story has more turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stops being awaited ten minutes after the last action was sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An echo whose send failed goes at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line already being made or echoing is sent again only when sent twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line wrapped whole in square brackets is an action like any other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action draft fills an empty line once, and a line being typed is left alone.",
    },
  ],
  createdAt: "2026-09-24T17:50:10.776Z",
  updatedAt: "2026-10-27T22:10:37.219Z",
} as const satisfies Module
