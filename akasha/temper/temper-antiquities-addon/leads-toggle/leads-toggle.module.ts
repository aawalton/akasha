import type { Module } from "@akasha/code-system/module"

export const leadsToggle = {
  id: "01a06274-b08a-7259-9ab9-8679894dbe99",
  pageTypeSlug: "module",
  slug: "leads-toggle",
  definition: "the sweep over every antiquity that fills the list, and the window's showing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sweep runs only while the window is hidden and about to be shown.",
    },
    {
      invariantKind: "departure",
      statement: "The zone and set menus are filled from the first sweep alone.",
    },
  ],
} as const satisfies Module
