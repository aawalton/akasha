import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessageLifecycle = {
  id: "01a06060-0d17-7a41-90e4-e85bd3b90570",
  type: "page-type/module",
  slug: "chat-message-lifecycle",
  definition: "the work the chat message library does once the game has loaded it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Saved settings are reconciled against the defaults on every load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "History is restored one frame after the player enters the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "History older than the maximum age is dropped rather than restored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings are saved under the world and display name of the account.",
    },
  ],
} as const satisfies Module
