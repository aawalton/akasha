import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuMain = {
  id: "01a06275-c449-7ac7-bcea-a44c4d7ba068",
  type: "page-type/module",
  slug: "scrollable-menu-main",
  definition: "the bare import list covering every module in the library",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Load order is expressed as a list of bare imports.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Constants and utilities are imported before every class that reads a constant.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The file declares no value of its own.",
    },
  ],
} as const satisfies Module
