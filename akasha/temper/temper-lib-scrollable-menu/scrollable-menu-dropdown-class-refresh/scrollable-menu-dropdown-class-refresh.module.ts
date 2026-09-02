import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownClassRefresh = {
  id: "01a06275-c448-78f2-b90c-8003eddf1e5a",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-class-refresh",
  definition: "the refresh of the current list or the open submenu after an entry changes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refresh returns a numeric code saying which of the two menus was redrawn.",
    },
    {
      invariantKind: "departure",
      statement: "The main-menu redraw is deferred by fifteen milliseconds through zo_callLater.",
    },
    {
      invariantKind: "departure",
      statement: "An open context menu is raised back to the top after any refresh.",
    },
    {
      invariantKind: "constraint",
      statement: "A hidden combobox dropdown is never refreshed.",
    },
  ],
} as const satisfies Module
