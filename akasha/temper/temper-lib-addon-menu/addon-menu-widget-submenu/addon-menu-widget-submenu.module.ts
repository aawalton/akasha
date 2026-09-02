import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetSubmenu = {
  id: "01a06100-0000-7000-8000-000000000027",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-submenu",
  definition: "the collapsible group of widgets under a titled bar",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The group starts closed.",
    },
    {
      invariantKind: "departure",
      statement: "A click on the title toggles the group open.",
    },
    {
      invariantKind: "departure",
      statement: "A click on the icon toggles the group open.",
    },
    {
      invariantKind: "departure",
      statement: "A click on the bottom edge toggles the group open.",
    },
    {
      invariantKind: "departure",
      statement: "A disabled submenu refuses to open.",
    },
    {
      invariantKind: "constraint",
      statement: "The scroll area resizes to its contents only while the submenu is open.",
    },
  ],
} as const satisfies Module
