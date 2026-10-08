import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingBuildWindow = {
  id: "01a06128-d5c7-7498-8a77-50a630fb18d4",
  type: "page-type/module",
  slug: "housing-build-window",
  definition: "building the housing window itself, with its header and its body",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the window sits is kept in saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body below the tabs is a panel, and a box inside it is cleared.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.255Z",
  updatedAt: "2026-09-25T16:11:39.000Z",
} as const satisfies Module
