import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderEntry = {
  id: "01a06381-67c1-7f0e-893a-74e8c40fa512",
  type: "page-type/module",
  slug: "keybinder-entry",
  definition: "the order the add-on's parts are set going in once the game has loaded it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is set going where the game will let neither binding call through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is published as the bundle loads rather than on the loaded event.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
