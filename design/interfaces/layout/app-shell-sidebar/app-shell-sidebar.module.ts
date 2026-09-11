import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const appShellSidebar = {
  id: "01a05b82-8b98-7341-a3de-18953237e37f",
  type: "module",
  slug: "app-shell-sidebar",
  definition: "the nav column a wide browser draws down the left of the frame",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nav link is dressed here rather than by each column that draws one.",
    },
    {
      invariantKind: "departure",
      statement: "A collapsed column draws a nav link centred and without its padding.",
    },
  ],
} as const satisfies Module
