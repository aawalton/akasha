import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryBuildData = {
  id: "01a198da-8335-7fee-8697-1b577b4bd49f",
  type: "page-type/module",
  slug: "characters-armory-build-data",
  definition: "a Temper build handed to the game's Armory controls as the game's own build data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build answers every question the game's Armory controls ask of the game's builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A piece of gear is shown from where it is held, and missing where it is held nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece held in a bank is shown as out of reach, as the game shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name or icon set in the game's settings dialog is held until the dialog closes.",
    },
  ],
  createdAt: "2026-11-01T20:43:39.700Z",
  updatedAt: "2026-11-01T20:43:39.700Z",
} as const satisfies Module
