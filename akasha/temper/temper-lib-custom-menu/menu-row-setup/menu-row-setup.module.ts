import type { Module } from "@akasha/code-system/module"

export const menuRowSetup = {
  id: "01a0605a-5821-7f11-b1c6-61c921c020da",
  pageTypeSlug: "module",
  slug: "menu-row-setup",
  definition: "the tooltip, divider and header work one menu row takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A divider next to another divider is hidden and counted as no height.",
    },
    {
      invariantKind: "departure",
      statement: "A divider's label reports a fixed size rather than measuring its text.",
    },
  ],
} as const satisfies Module
