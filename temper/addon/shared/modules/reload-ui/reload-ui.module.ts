import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reloadUi = {
  id: "01a090b2-4c81-73e4-85d7-24204ef52dcd",
  type: "page-type/module",
  slug: "reload-ui",
  definition: "the game asked to load its interface again with the player left where they are",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The interface is loaded again with the player still in the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is handed back, because the interface goes before the next line runs.",
    },
  ],
  createdAt: "2026-09-11T13:39:59.233Z",
  updatedAt: "2026-09-21T22:10:28.000Z",
} as const satisfies Module
