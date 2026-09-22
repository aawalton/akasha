import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuConstantsComboboxCallbacks = {
  id: "01a0c47e-8c09-7974-a456-4d914a611d6c",
  type: "page-type/module",
  slug: "scrollable-menu-constants-combobox-callbacks",
  definition: "the callback applying a library combobox option to the ZO_ComboBox it drives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every multi-selection option is funnelled through one shared update function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A negative maximum selection count is treated as no limit.",
    },
  ],
} as const satisfies Module
