import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEntry = {
  id: "01a0611d-84d4-78d0-bf13-a155e200451a",
  type: "page-type/module",
  slug: "companions-entry",
  definition: "what the companion code does once this add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion tab is registered with the tab manager rather than drawn alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion code initialises after everything else the add-on initialises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every sub-tab registered here names both the panel it makes and the refresh.",
    },
  ],
} as const satisfies Module
