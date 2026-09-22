import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoBaseGameStringIds = {
  id: "01a06372-72ff-7026-81c6-4b3dcc1fde65",
  type: "page-type/module",
  slug: "eso-base-game-string-ids",
  definition: "every string id the base game provides, gathered from the sets with them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A string id absent here is a string id the base game does not provide.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This census says neither which clone it was read from nor at what version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The runs with the ids are divided only to keep each file under the ceiling.",
    },
  ],
} as const satisfies Module
