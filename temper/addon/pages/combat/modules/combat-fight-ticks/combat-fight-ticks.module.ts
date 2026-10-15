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
      statement:
        "Max health, the shield on the health bar and armor are sampled each second in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick takes the last sample before it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick's shield is what is left of it when sampled, not its full size.",
    },
  ],
  createdAt: "2026-10-15T15:22:11.793Z",
  updatedAt: "2026-10-15T15:22:11.793Z",
} as const satisfies Module
