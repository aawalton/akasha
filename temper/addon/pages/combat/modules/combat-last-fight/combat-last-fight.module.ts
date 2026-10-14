import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatLastFight = {
  id: "01a13c8a-fdb8-7f70-8c68-aa9390c65744",
  type: "page-type/module",
  slug: "combat-last-fight",
  definition: "what the player healed themself for in the fight that just ended, by ability",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The fight that just ended is written to saved variables with no Save pressed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each fight replaces the one written before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Healing counts only what the player heals themself for, by the ability that healed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shield's absorbs are one total, since the game names the blow and not the shield.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cast is counted when the skill starts, by the ability that started.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The summary holds only what checking Temper's healing per second needs.",
    },
  ],
  createdAt: "2026-10-14T22:31:44.311Z",
  updatedAt: "2026-10-14T22:31:44.311Z",
} as const satisfies Module
