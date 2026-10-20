import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPassiveRankIds = {
  id: "01a15a2f-d1e6-70d6-af7a-dfa105756429",
  type: "page-type/module",
  slug: "characters-passive-rank-ids",
  definition: "every passive's ability id at each rank, as the game gives them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Passives are read from class, weapon, armor, world, guild, Alliance War, racial and craft lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A passive's ability ids are listed in rank order, so a place in the list is a rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive with no ability id at its first rank is left out.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The first three readings of a session carry every passive's ability id at each rank.",
    },
  ],
  createdAt: "2026-10-20T16:40:45.798Z",
  updatedAt: "2026-10-20T16:40:45.798Z",
} as const satisfies Module
