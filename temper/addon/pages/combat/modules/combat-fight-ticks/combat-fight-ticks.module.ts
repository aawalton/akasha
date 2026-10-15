import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatFightTicks = {
  id: "01a14028-17d1-7acc-8bbb-ad4c8de96f92",
  type: "page-type/module",
  slug: "combat-fight-ticks",
  definition: "what kept the player alive in each second of the fight that just ended",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick is one second from the fight's start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick's healing is what the player healed themself for in it, overheal included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Max health, shields and armor are sampled each second in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick takes the last sample before it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield counts its full size from when it lands until it is gone from the bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample's shield is the most that was up since the sample before.",
    },
  ],
  createdAt: "2026-10-15T15:22:11.793Z",
  updatedAt: "2026-10-15T15:29:54.330Z",
} as const satisfies Module
