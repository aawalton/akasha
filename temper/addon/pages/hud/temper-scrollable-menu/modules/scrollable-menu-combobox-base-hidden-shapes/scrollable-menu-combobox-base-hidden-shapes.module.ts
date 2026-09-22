import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseHiddenShapes = {
  id: "01a0c50e-0ee6-7f43-b7fc-37fa742158ae",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-hidden-shapes",
  definition: "the shapes the decision on hiding a menu narrows a menu and a click check to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The cast is not guarded by any runtime check.",
    },
  ],
} as const satisfies Module
