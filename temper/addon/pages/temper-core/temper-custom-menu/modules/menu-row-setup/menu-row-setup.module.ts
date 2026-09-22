import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const menuRowSetup = {
  id: "01a0605a-5821-7f11-b1c6-61c921c020da",
  type: "page-type/module",
  slug: "menu-row-setup",
  definition: "the tooltip, divider and header work one menu row takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A divider next to another divider is hidden and counted as no height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A divider's label reports a fixed size rather than measuring its text.",
    },
  ],
} as const satisfies Module
