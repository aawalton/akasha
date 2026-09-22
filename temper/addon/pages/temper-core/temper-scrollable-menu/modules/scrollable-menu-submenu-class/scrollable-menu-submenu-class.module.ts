import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuSubmenuClass = {
  id: "01a06275-c449-78c6-b82b-ac1795e8c9dd",
  type: "page-type/module",
  slug: "scrollable-menu-submenu-class",
  definition: "the submenu object and the proxy that reads through to its parent combobox",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A submenu is a proxy table with a metatable rather than a plain subclass instance.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A key absent from the exposed table is never read from the parent combobox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A submenu highlights the opening control for as long as the submenu is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hiding runs an optional onHideDropdownCallback supplied by the caller.",
    },
  ],
} as const satisfies Module
