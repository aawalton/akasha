import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const entityFiling = {
  id: "01a0c654-5de8-706c-9a36-a6ada7c99975",
  type: "page-type/module",
  slug: "entity-filing",
  definition: "the page one of an old engine's rows becomes, for what a game's world holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holding its sheet under a key reads the same as a row holding it flat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug opens with the game's own, so two games may hold the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class the old engine wrote as none is no class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dice a sheet says are read as the mechanic rolling them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty list is left off rather than written empty.",
    },
  ],
} as const satisfies Module
