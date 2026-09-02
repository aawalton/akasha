import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserGlobal = {
  id: "01a06178-371c-7a53-91d3-e4251c76d175",
  pageTypeSlug: "module",
  slug: "item-browser-global",
  definition: "the three row handlers this add-on's own markup calls back into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This global is the add-on's own name rather than a name the game owns.",
    },
  ],
} as const satisfies Module
