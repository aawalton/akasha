import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBar = {
  id: "01a0d48b-8f76-7e2b-9030-a05bc2c03057",
  type: "page-type/module",
  slug: "action-bar",
  definition: "the line a player types an action into and sends a game, over the actions waiting",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The actions waiting are drawn grey and italic above the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The actions waiting are asked for every five seconds while a player is signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action that failed to send is put back on the line with the error above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader not signed in is asked to sign in rather than shown the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line rises above the keyboard on a phone.",
    },
  ],
} as const satisfies Module
