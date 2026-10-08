import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSearchuiGlobals = {
  id: "01a0623e-53a0-7264-80a2-22545178e71e",
  type: "page-type/module",
  slug: "sets-search-ui-searchui-globals",
  definition: "where the live keyboard and gamepad search windows are kept",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is reached by importing the function that answers it.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.944Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
