import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTraceSaying = {
  id: "01a08de9-9baa-7d2a-9edd-e51a79c7f0af",
  type: "module",
  slug: "inventory-trace-saying",
  definition: "a number a Temper trace carried, written out for a line of a report",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the trace carried no number for is written as `nil`.",
    },
  ],
} as const satisfies Module
