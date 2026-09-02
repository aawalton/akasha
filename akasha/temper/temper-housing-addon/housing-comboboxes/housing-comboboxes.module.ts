import type { Module } from "@akasha/code-system/module"

export const housingComboboxes = {
  id: "01a06128-d5c9-78cc-9a1a-1b0d3985edd8",
  pageTypeSlug: "module",
  slug: "housing-comboboxes",
  definition: "the drop-downs listing a player's favourite houses",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A favourite chosen in a drop-down ports without a further click.",
    },
  ],
} as const satisfies Module
