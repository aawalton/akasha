import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pinState = {
  id: "01a06062-57df-7c3f-ac72-528c32955542",
  type: "page-type/module",
  slug: "pin-state",
  definition: "whether a pin type is drawn, and the checkboxes that state drives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Enabling a pin type on the global map filter group changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pins are refreshed only where the enabled state changed.",
    },
  ],
} as const satisfies Module
