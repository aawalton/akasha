import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingContextMenu = {
  id: "01a06128-d5ca-706a-a06b-ee7f1746eb74",
  type: "page-type/module",
  slug: "housing-context-menu",
  definition: "adding a send-visit-card entry to the chat and guild-roster right-click menus",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own context-menu function is wrapped rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wrap is put on after a delay the game needs to build a context menu.",
    },
  ],
} as const satisfies Module
