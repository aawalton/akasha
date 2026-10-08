import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedContextmenu = {
  id: "01a0623e-53a0-784d-a83c-91ac526137c8",
  type: "page-type/module",
  slug: "sets-search-ui-shared-contextmenu",
  definition: "the scrollable menus the search window opens away from its result rows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These menus open only when TemperScrollableMenu is present.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.944Z",
  updatedAt: "2026-09-22T04:20:35.000Z",
} as const satisfies Module
