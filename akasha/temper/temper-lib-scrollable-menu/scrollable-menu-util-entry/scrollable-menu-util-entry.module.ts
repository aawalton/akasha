import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilEntry = {
  id: "01a06275-c449-773f-88d5-9e719f360ed7",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-entry",
  definition: "the recursive walks over an entry and its nested submenu entries",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Recursion is bounded by a counter that aborts after five thousand steps.",
    },
    {
      invariantKind: "departure",
      statement: "The multi-select state of a submenu is recomputed by walking every child entry.",
    },
    {
      invariantKind: "departure",
      statement: "The submenu arrow tint is chosen from whether a nested entry is selected.",
    },
    {
      invariantKind: "constraint",
      statement: "Reading up through parent menus stops at a depth of one hundred.",
    },
  ],
} as const satisfies Module
