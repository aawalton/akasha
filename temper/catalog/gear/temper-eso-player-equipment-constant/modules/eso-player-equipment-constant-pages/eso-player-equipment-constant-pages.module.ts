import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPlayerEquipmentConstantPages = {
  id: "01a0d62c-4624-7bf3-b478-830ca19d8e09",
  type: "page-type/module",
  slug: "eso-player-equipment-constant-pages",
  definition: "the game number each player equipment constant page states, by family and id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are read from the held catalogue with the gear, not imported.",
    },
  ],
} as const satisfies Module
