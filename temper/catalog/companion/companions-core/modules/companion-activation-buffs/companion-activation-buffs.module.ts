import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionActivationBuffs = {
  id: "01a06110-abe1-76b3-a5f0-27936e095c05",
  type: "page-type/module",
  slug: "companion-activation-buffs",
  definition: "the buff names a companion skill shows where the shared buff table has none",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff's name is read from its page rather than from a copy in code.",
    },
  ],
} as const satisfies Module
