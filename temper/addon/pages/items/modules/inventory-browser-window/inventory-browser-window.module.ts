import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserWindow = {
  id: "01a06258-b529-74f2-9578-b1ef2c59ab8b",
  type: "page-type/module",
  slug: "inventory-browser-window",
  definition: "the cross-character browser window and the scroll list of rows inside it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window docked beside the inventory sits on the game's panel background.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window floating over play sits on the window backdrop.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.849Z",
  updatedAt: "2026-10-28T16:08:46.021Z",
} as const satisfies Module
