import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerBeside = {
  id: "01a0ca9e-ea64-779b-b65f-7f138ba63302",
  type: "page-type/module",
  slug: "player-beside",
  definition: "the player of a story played, read off the story's external id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played is found by the external id the run being drawn carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player is the character player of that story played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story and every character player are asked at once, and joined here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no character player is answered nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that refuses is reported and answered nothing rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  createdAt: "2026-09-22T19:36:47.460Z",
  updatedAt: "2026-09-28T14:30:31.000Z",
} as const satisfies Module
