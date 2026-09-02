import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownClassFilter = {
  id: "01a06275-c447-7694-bdd6-3f09904c1493",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-class-filter",
  definition: "the filter edit box of the dropdown header and its saved search history",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The search history keeps at most ten entries per combobox.",
    },
    {
      invariantKind: "departure",
      statement: "History is offered through ZO_Menu rather than through a library menu.",
    },
    {
      invariantKind: "departure",
      statement: "Filter text reaches the combobox through a ten millisecond throttle.",
    },
    {
      invariantKind: "departure",
      statement: "The sort toggle and the edit box and slider change handlers sit alongside.",
    },
  ],
} as const satisfies Module
