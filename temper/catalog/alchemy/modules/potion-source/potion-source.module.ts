import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionSource = {
  id: "01a06076-1b6c-74d2-820b-7207017f2a40",
  type: "page-type/module",
  slug: "potion-source",
  definition: "the potion a build drinks, and the boons it gives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Potions are read from the temper-potion pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The potion pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
