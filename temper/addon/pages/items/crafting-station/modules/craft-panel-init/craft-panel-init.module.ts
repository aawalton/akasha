import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftPanelInit = {
  id: "01a061c7-e85d-7dbd-badd-8852eeaa18f0",
  type: "page-type/module",
  slug: "craft-panel-init",
  definition: "builds the main crafting panel once",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafting window sits where it was saved, or centred where that is off the screen.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.237Z",
  updatedAt: "2026-10-18T19:37:46.466Z",
} as const satisfies Module
