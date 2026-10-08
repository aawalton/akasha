import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuConstantsIndex = {
  id: "01a06275-c446-7ea2-9bcd-f88189f54a12",
  type: "page-type/module",
  slug: "scrollable-menu-constants-index",
  definition: "the bare import list covering the four constant modules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list of bare imports is used in place of any re-export.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order of the imports is the order the constant tables are built in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The file declares no value of its own.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.262Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
