import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBarState = {
  id: "01a0d48a-0758-724f-85b2-9b2412f0754f",
  type: "page-type/module",
  slug: "action-bar-state",
  definition: "what a game's action bar shows of the actions sent and still waiting",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action sent is echoed at once, before the game has answered the send.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An echo goes once a list of waiting actions asked for after its write is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action's echo stays while the turn answering it is awaited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is awaited from an action sent or waiting until the story has more turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Feedback awaits no turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stops being awaited ten minutes after the last action was seen waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An echo whose send failed goes at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line already waiting or echoing is sent again only when sent twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line wrapped whole in square brackets is tagged as feedback.",
    },
  ],
} as const satisfies Module
