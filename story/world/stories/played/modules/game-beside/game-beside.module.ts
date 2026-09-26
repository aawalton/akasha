import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameBeside = {
  id: "01a0a160-1d33-7b41-8c07-5f9a2e6b3d18",
  type: "page-type/module",
  slug: "game-beside",
  definition: "the external id and coordinator agent a story played states",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The story played read is the one whose slug is the slug asked for.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A store that answers nothing is told apart from a slug no story played has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The seat a story played names as its coordinator agent is read with its external id.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here polls, so these are read once as the story opens.",
    },
  ],
} as const satisfies Module
