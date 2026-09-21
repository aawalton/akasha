import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsMundusData = {
  id: "01a06269-29b9-7e03-beb8-590215cb417d",
  type: "page-type/module",
  slug: "destinations-mundus-data",
  definition: "the mundus stones by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
