import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownHandlerFunctions = {
  id: "01a06275-c448-701d-9543-d5f2bef911cb",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-handler-functions",
  definition: "the per-entry-type handlers for mouse enter, exit and up on a dropdown row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Handlers are keyed by entry type inside three named tables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header or divider handler returns true and does no other work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Entering a submenu row cancels the pending hide timeout before showing the submenu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The boolean a handler returns decides whether the ZO_ComboBox behaviour also runs.",
    },
  ],
} as const satisfies Module
