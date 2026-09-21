import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const journalWindow = {
  id: "01a0617d-5454-7cab-9709-1e96bec082bc",
  type: "page-type/module",
  slug: "journal-window",
  definition: "the scene and menu bar the window is built from the first time the window is shown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is built once and kept for as long as the game runs.",
    },
  ],
} as const satisfies Module
