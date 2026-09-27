import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureRaceMap = {
  id: "01a0616b-4cc4-79a8-bbd5-ed51f0322bc0",
  type: "page-type/module",
  slug: "character-capture-race-map",
  definition: "each race's game id against its place in a build hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each place is the hash place a race page states, compiled in from the race pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game id no race page states takes the no-race page's place.",
    },
  ],
} as const satisfies Module
