import type { Module } from "@akasha/code-system/module"

export const scrollableMenuConstantsSubmenu = {
  id: "01a06275-c446-71a1-b332-1345a2da6cf2",
  pageTypeSlug: "module",
  slug: "scrollable-menu-constants-submenu",
  definition: "the keys and methods a submenu proxy reads through to its owning combobox",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each exposed key carries a boolean saying whether the proxy forwards that key.",
    },
    {
      invariantKind: "departure",
      statement: "The no-results placeholder entries are declared here as ordinary menu entries.",
    },
    {
      invariantKind: "departure",
      statement: "Silencing a click is done by swapping the sound name in the game sound table.",
    },
    {
      invariantKind: "constraint",
      statement: "A silenceable click sound exists for every entry type a click can reach.",
    },
  ],
} as const satisfies Module
