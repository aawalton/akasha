import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuApiRefresh = {
  id: "01a06275-c443-7905-af8d-6d33bbb2d716",
  type: "page-type/module",
  slug: "scrollable-menu-api-refresh",
  definition: "the globals that refresh a live menu and report whether one is shown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A numeric constant says which menus a refresh redraws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The default right-click menu for a button group is defined here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A refresh does nothing while the owning dropdown is hidden.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The button-group menu is drawn with ZO_Menu when a context menu is already open.",
    },
  ],
} as const satisfies Module
