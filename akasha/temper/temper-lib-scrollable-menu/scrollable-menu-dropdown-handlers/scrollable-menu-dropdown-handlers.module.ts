import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownHandlers = {
  id: "01a06275-c448-75c4-bb2b-16f01a915b1e",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-handlers",
  definition: "the row construction and recycling behind the dropdown scroll list",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "One shared named update handler serves as the submenu show timeout.",
    },
    {
      invariantKind: "departure",
      statement: "The last entry of a list is given a distinct scroll type id.",
    },
    {
      invariantKind: "departure",
      statement:
        "Resetting a pooled row hides that row and takes the row's button out of the button group.",
    },
    {
      invariantKind: "departure",
      statement: "Row width is measured from the label text through the item font object.",
    },
  ],
} as const satisfies Module
