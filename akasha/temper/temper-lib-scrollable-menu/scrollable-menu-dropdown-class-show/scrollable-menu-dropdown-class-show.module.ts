import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownClassShow = {
  id: "01a06275-c448-7005-be53-d0fe0ff38c84",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-class-show",
  definition: "the population of the scroll list and the sizing of the dropdown on show",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every item passes through the filter before reaching the data list.",
    },
    {
      invariantKind: "departure",
      statement: "A list that matches nothing shows a single no-results row.",
    },
    {
      invariantKind: "constraint",
      statement: "Dropdown width is clamped between the minimum and the longest entry text.",
    },
    {
      invariantKind: "departure",
      statement: "The scroll contents template is swapped by whether the bar is needed.",
    },
  ],
} as const satisfies Module
