import type { Module } from "@akasha/code-system/module"

export const addonMenuAddonList = {
  id: "01a06100-0000-7000-8000-000000000000",
  pageTypeSlug: "module",
  slug: "addon-menu-addon-list",
  definition: "the scrolling list of registered addon panels and its search filter box",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Search text is escaped for Lua patterns before matching.",
    },
    {
      invariantKind: "departure",
      statement: "Whitespace inside a search term matches any characters between the words.",
    },
    {
      invariantKind: "departure",
      statement: "Row selection survives a rebuild without replaying the selection sound.",
    },
    {
      invariantKind: "constraint",
      statement: "The row control factory is replaced after ZO_ScrollList registers the data type.",
    },
  ],
} as const satisfies Module
