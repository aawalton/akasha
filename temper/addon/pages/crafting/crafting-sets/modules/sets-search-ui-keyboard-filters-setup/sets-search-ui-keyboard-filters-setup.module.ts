import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardFiltersSetup = {
  id: "01a0623e-53a1-71e5-8547-9eccb2b6b04b",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-filters-setup",
  definition: "the shared build steps behind every keyboard filter dropdown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Multi-select is only turned on when the combo box class offers multi-select.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Mouse-over callbacks are only set when the combo box class offers mouse-over callbacks.",
    },
  ],
} as const satisfies Module
