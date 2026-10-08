import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedUi = {
  id: "01a0623c-2df8-7100-80db-d50fc719e34f",
  type: "page-type/module",
  slug: "sets-search-ui-shared-ui",
  definition: "what any search window does when it is shown, hidden or reset",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Showing the window announces itself through a named callback.",
    },
  ],
  createdAt: "2026-09-02T13:08:26.232Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
