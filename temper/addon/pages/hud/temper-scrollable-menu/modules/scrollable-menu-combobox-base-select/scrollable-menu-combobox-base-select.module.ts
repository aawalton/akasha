import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseSelect = {
  id: "01a06275-c445-7558-8143-c9b8adcfa975",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-select",
  definition: "the selection of an entry in single-select and multi-select menus",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking a no-results row is detected and suppressed before any callback runs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A disabled entry cannot be selected.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Exceeding the selection limit raises a game alert unless a callback intercepts the alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Single-select selection closes the dropdown while multi-select leaves the dropdown open.",
    },
  ],
} as const satisfies Module
