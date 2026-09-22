import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftingSlotHandlerStats = {
  id: "01a061c7-e879-7974-affb-2305b596cf40",
  type: "page-type/module",
  slug: "crafting-slot-handler-stats",
  definition: "how long an inventory slot handler took",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module's top level touches no global only the game declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chat command is installed by a function the add-on's load calls.",
    },
  ],
} as const satisfies Module
