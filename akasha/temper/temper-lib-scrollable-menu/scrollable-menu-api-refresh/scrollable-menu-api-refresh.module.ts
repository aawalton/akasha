import type { Module } from "@akasha/code-system/module"

export const scrollableMenuApiRefresh = {
  id: "01a06275-c443-7905-af8d-6d33bbb2d716",
  pageTypeSlug: "module",
  slug: "scrollable-menu-api-refresh",
  definition: "the globals that refresh a live menu and report whether one is shown",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A numeric constant says which menus a refresh redraws.",
    },
    {
      invariantKind: "departure",
      statement: "The default right-click menu for a button group is defined here.",
    },
    {
      invariantKind: "constraint",
      statement: "A refresh does nothing while the owning dropdown is hidden.",
    },
    {
      invariantKind: "departure",
      statement: "The button-group menu is drawn with ZO_Menu when a context menu is already open.",
    },
  ],
} as const satisfies Module
