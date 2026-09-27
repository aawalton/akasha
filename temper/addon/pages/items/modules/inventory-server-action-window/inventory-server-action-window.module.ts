import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryServerActionWindow = {
  id: "01a0e368-1a45-73b9-9f3d-974730c1f2ed",
  type: "page-type/module",
  slug: "inventory-server-action-window",
  definition: "keeping the server actions the addon sends in bulk under the game's limit",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game drops a player who sends more than 100 actions in 10 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addon's bulk senders count their actions in one shared window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bank's paced chain keeps a window of its own and is not counted here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender needing room for several actions at once waits until all of them fit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Actions go out as fast as they come until 95 went out in the last 10.5 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At that count the next action waits for the oldest of them to age out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No action waits a fixed time before it goes out.",
    },
  ],
} as const satisfies Module
