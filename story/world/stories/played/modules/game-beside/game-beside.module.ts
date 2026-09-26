import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameBeside = {
  id: "01a0a160-1d33-7b41-8c07-5f9a2e6b3d18",
  type: "page-type/module",
  slug: "game-beside",
  definition: "the game a played story shares a slug with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game read is the one game whose slug is the played story's own slug.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A store that answers nothing is told apart from a story no game names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat a game names as its coordinator agent is read with the game.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here polls, so the game is read once as the story opens.",
    },
  ],
} as const satisfies Module
