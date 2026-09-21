import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poolPanel = {
  id: "01a0c4a1-be31-7274-b419-1776b8ae4de4",
  type: "page-type/module",
  slug: "pool-panel",
  definition: "a panel of pool bars, one bar for each pool the panel is given",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game says which pools its bars are of and what each one is called.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No pool is named here.",
    },
  ],
} as const satisfies Module
