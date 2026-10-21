import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBoughtPassives = {
  id: "01a15e82-6ba6-7309-9979-036d56146f37",
  type: "page-type/module",
  slug: "characters-bought-passives",
  definition: "each passive a character has bought, with the text the game gives it now",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Class passives are read apart from the passives of every other line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The other passives are read from weapon, armor, world, guild, Alliance War and racial lines.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No craft passive is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive is read at the rank bought, by that rank's ability id.",
    },
  ],
  createdAt: "2026-10-21T12:49:27.974Z",
  updatedAt: "2026-10-21T12:49:27.974Z",
} as const satisfies Module
