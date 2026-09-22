import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gamePlayerBeside = {
  id: "01a0ca9e-ea64-779b-b65f-7f138ba63302",
  type: "page-type/module",
  slug: "game-player-beside",
  definition: "the player a game names, read off the game's external id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game is found by the external id the run being drawn carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no player of its own is answered nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that refuses is answered nothing rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
