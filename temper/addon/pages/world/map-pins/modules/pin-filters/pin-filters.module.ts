import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pinFilters = {
  id: "01a06062-57e0-7e1a-b3d7-a8820fb90bc1",
  type: "page-type/module",
  slug: "pin-filters",
  definition: "the checkbox a pin type gets on each map filter panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin type already carrying a filter gets no second filter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Separate saved keys are minted per map group only where asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggled checkbox writes the compass pin type's saved key as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden filter checkbox is pulled up by its own height.",
    },
  ],
} as const satisfies Module
