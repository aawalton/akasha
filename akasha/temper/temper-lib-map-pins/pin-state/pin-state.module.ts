import type { Module } from "@akasha/code-system/module"

export const pinState = {
  id: "01a06062-57df-7c3f-ac72-528c32955542",
  pageTypeSlug: "module",
  slug: "pin-state",
  definition: "whether a pin type is drawn, and the checkboxes that state drives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Enabling a pin type on the global map filter group changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Pins are refreshed only where the enabled state changed.",
    },
  ],
} as const satisfies Module
