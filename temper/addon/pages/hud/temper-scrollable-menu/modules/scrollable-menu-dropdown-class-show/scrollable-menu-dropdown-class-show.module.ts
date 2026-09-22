import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownClassShow = {
  id: "01a06275-c448-7005-be53-d0fe0ff38c84",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-class-show",
  definition: "the population of the scroll list and the sizing of the dropdown on show",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every item passes through the filter before reaching the data list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list that matches nothing shows a single no-results row.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Dropdown width is clamped between the minimum and the longest entry text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scroll contents template is swapped by whether the bar is needed.",
    },
  ],
} as const satisfies Module
