import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiListBuild = {
  id: "01a0623e-53a0-7c7c-944a-09cd92bf699b",
  type: "page-type/module",
  slug: "sets-search-ui-list-build",
  definition: "the row each set becomes in the result list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "At most five drop locations are shown in one row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The setting can append a set's English name to the set's own name.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.944Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
