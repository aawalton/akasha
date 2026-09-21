import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuContextmenuSpecialCallbacks = {
  id: "01a06275-c447-73b4-84ed-9d98c66f63d5",
  type: "page-type/module",
  slug: "scrollable-menu-contextmenu-special-callbacks",
  definition: "the registry of per-addon show and hide callbacks on the context menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Callbacks are keyed by a unique addon name supplied by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The registry is a numerically indexed list of single-addon tables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Running a callback keeps the first truthy return across every addon.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A registration whose named field is not a function is rejected.",
    },
  ],
} as const satisfies Module
