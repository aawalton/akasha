import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameSchema = {
  id: "01a05b71-e543-7c87-8c6e-cfaef2c52761",
  type: "page-type/module",
  slug: "game-schema",
  definition: "the sections a story's session is composed of, and how a story alerts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sheet panel may only ask for reveal keys the code names.",
    },
  ],
} as const satisfies Module
