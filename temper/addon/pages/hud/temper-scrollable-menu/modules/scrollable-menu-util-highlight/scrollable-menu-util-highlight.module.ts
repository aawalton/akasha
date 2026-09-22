import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilHighlight = {
  id: "01a06275-c449-7422-aa38-f077e3516352",
  type: "page-type/module",
  slug: "scrollable-menu-util-highlight",
  definition: "the highlight animation applied to a hovered submenu or context-menu row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The animation control is created once and cached on the row under a field name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Unhighlighting clears the breadcrumb name from the row.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The screen's usable dropdown height is the GuiRoot height less one hundred.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row whose highlight template is not a string falls back to the library default.",
    },
  ],
} as const satisfies Module
