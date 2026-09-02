import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxClass = {
  id: "01a06275-c446-70da-9906-1d4292ab215a",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-class",
  definition: "the subclass a normal dropdown menu on an existing ZO_ComboBox becomes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An existing combobox is adopted by replacing its metatable in place.",
    },
    {
      invariantKind: "departure",
      statement: "Sorting is offered only where filtering is also enabled.",
    },
    {
      invariantKind: "departure",
      statement: "Multi-select bookkeeping walks upward to update every opening control.",
    },
    {
      invariantKind: "constraint",
      statement: "The visible row count falls back to the library default of ten.",
    },
  ],
} as const satisfies Module
