import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderShare = {
  id: "01a06381-67c1-7b12-b16d-aa11abf8a0bf",
  type: "page-type/module",
  slug: "keybinder-share",
  definition:
    "carrying an account-wide binding onto the character, and taking a character's binding account-wide",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Synchronising is deferred to the next frame rather than done in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is rebound only where its keys differ from the saved ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The toggle clears the shown actions where those actions are already shared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden action is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Synchronising waits until the player is out of combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Synchronising counts the actions it rebinds and hands that count on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle of sharing is captured as a change of each action it reaches.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-10-28T22:04:42.239Z",
} as const satisfies Module
