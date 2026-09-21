import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilEntry = {
  id: "01a06275-c449-773f-88d5-9e719f360ed7",
  type: "page-type/module",
  slug: "scrollable-menu-util-entry",
  definition: "the recursive walks over an entry and its nested submenu entries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Recursion is bounded by a counter that aborts after five thousand steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The multi-select state of a submenu is recomputed by walking every child entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The submenu arrow tint is chosen from whether a nested entry is selected.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Reading up through parent menus stops at a depth of one hundred.",
    },
  ],
} as const satisfies Module
