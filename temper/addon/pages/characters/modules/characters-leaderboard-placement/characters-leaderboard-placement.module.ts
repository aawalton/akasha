import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersLeaderboardPlacement = {
  id: "01a1893c-63cd-707d-b6a4-3c846b550e53",
  type: "page-type/module",
  slug: "characters-leaderboard-placement",
  definition: "a task marked done when the game says the player placed on a leaderboard",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a notification naming the player marks a task, so a friend's placement marks nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A task whose due date is still to come is left alone, as the auto-completion leaves it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here removes a notification, so the game still offers the player that score to post.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notification already there as the add-on loads marks nothing, as it may be old.",
    },
  ],
  createdAt: "2026-10-29T19:56:38.732Z",
  updatedAt: "2026-10-29T20:02:56.181Z",
} as const satisfies Module
