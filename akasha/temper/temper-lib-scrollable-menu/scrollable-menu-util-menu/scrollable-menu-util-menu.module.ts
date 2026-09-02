import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilMenu = {
  id: "01a06275-c449-7de1-9732-9875c8e401e9",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-menu",
  definition: "the resolution and teardown of the one context menu the library keeps",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The library holds a single context menu object for the whole session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A throttled call is registered as a named update handler that unregisters itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "Mixing tables in skips a key the target already holds unless an override says so.",
    },
    {
      invariantKind: "departure",
      statement:
        "Hiding the context menu also clears the menu items unless a preventer variable blocks the clearing.",
    },
  ],
} as const satisfies Module
