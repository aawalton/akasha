import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedDropdownMenu = {
  id: "01a0c516-5552-75e9-acfd-2b36dfabfb0e",
  type: "page-type/module",
  slug: "sets-search-ui-shared-dropdown-menu",
  definition: "the menu a right click on a filter dropdown of the search window opens",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This menu opens only when TemperScrollableMenu is present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The drop zone dropdown offers the zone the player is in and its parent zone.",
    },
  ],
} as const satisfies Module
