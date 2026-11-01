import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryRows = {
  id: "01a198da-8336-7054-9e08-80932540b272",
  type: "page-type/module",
  slug: "characters-armory-rows",
  definition: "the rows of the Temper Armory, drawn from the game's own Armory entry templates",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is filled in the order and the words the game's Armory fills its own rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click on a row reaches Temper rather than the game's Armory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build names no outfit, and a build with no mundus stone names none.",
    },
  ],
  createdAt: "2026-11-01T20:43:39.700Z",
  updatedAt: "2026-11-01T20:43:39.700Z",
} as const satisfies Module
