import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsInventoryMatcher = {
  id: "01a0611d-84dd-7692-b051-cdbafe3f791d",
  type: "page-type/module",
  slug: "companions-inventory-matcher",
  definition: "finding the best item a companion has for each gear slot a build names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is scored for nearness rather than matched exactly.",
    },
  ],
} as const satisfies Module
