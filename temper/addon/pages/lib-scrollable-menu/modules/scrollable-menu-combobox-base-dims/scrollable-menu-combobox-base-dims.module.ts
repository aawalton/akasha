import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseDims = {
  id: "01a06275-c444-7f18-a029-2aac2cb9b481",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-dims",
  definition: "the accessors and the show, hide and height methods shared by every menu class",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Menu height is clamped between one row and the screen height less one hundred.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The submenu object is created lazily on first request and then reused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty submenu is filled with a single no-entries placeholder row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Showing a submenu hides the context menu unless that menu is already visible.",
    },
  ],
} as const satisfies Module
