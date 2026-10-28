import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryServerActionWindow = {
  id: "01a0e368-1a45-73b9-9f3d-974730c1f2ed",
  type: "page-type/module",
  slug: "inventory-server-action-window",
  definition: "keeping the server actions the addon sends in bulk under the game's limit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game drops a player who sends more than 100 actions in 10 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every server action a storage visit sends is counted in this one window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bank's moves are counted here with every other action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The budget is 50, half the game's limit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The other half is left to the game, to other add-ons and to the player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window lasts as long as the addon is loaded, across every visit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A visit opened soon after another spends what that visit left of the budget.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender needing room for several actions at once waits until all of them fit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Actions go out as fast as they come until 50 went out in the last 10.5 seconds.",
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
  createdAt: "2026-09-27T15:07:25.637Z",
  updatedAt: "2026-10-28T20:59:24.681Z",
} as const satisfies Module
