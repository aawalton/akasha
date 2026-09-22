import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilMenu = {
  id: "01a06275-c449-7de1-9732-9875c8e401e9",
  type: "page-type/module",
  slug: "scrollable-menu-util-menu",
  definition: "the resolution and teardown of the one context menu the library keeps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The library has a single context menu object for the whole session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A throttled call is registered as a named update handler that unregisters itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mixing tables in skips a key the target already has unless an override says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Hiding the context menu also clears the menu items unless a preventer variable blocks the clearing.",
    },
  ],
} as const satisfies Module
