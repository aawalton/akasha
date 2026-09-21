import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossTimers = {
  id: "01a06157-8358-7ee9-8d50-84cac768c2cb",
  type: "page-type/module",
  slug: "next-boss-timers",
  definition: "how long each district has left, and what starts a district's count",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A timer has the second a boss returns rather than the seconds left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The district with the longest time left is where the round is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sewers are listed first and the six districts follow in running order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A timer a player starts is shared with the group and one a group member shares is not.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A time here is a second the game counts rather than a date.",
    },
  ],
} as const satisfies Module
