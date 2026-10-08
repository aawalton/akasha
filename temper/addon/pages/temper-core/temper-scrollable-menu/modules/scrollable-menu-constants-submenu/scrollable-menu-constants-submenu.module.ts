import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuConstantsSubmenu = {
  id: "01a06275-c446-71a1-b332-1345a2da6cf2",
  type: "page-type/module",
  slug: "scrollable-menu-constants-submenu",
  definition: "the keys and methods a submenu proxy reads through to its owning combobox",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each exposed key has a boolean saying whether the proxy forwards that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The no-results placeholder entries are declared here as ordinary menu entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Silencing a click is done by swapping the sound name in the game sound table.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A silenceable click sound exists for every entry type a click can reach.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.262Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
