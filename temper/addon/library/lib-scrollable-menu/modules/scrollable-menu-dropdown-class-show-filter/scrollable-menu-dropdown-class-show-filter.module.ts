import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownClassShowFilter = {
  id: "01a06275-c448-7c9d-9bb0-5a9cce0d8e94",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-class-show-filter",
  definition: "the text search that decides whether one entry survives the current filter",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A leading slash in the search string makes submenu entries ignore the filter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Edit box and slider children are searched through their declared getter names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Filter state is held in module-level variables reset at the start of each show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry may opt out of filtering through a doNotFilter callback.",
    },
  ],
} as const satisfies Module
