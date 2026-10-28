import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHouseRoute = {
  id: "01a18437-a670-728f-894b-02037f1bb257",
  type: "page-type/module",
  slug: "inventory-house-route",
  definition: "the house a furnishing's chain sends it to, by the room the last scans recorded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A furnishing whose chain reaches a house with room for its stack resolves to that house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A furnishing whose chain reaches no house with known room resolves to its storage leg.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A vault visit takes out, for the carrier, the stacks the houses are allotted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house's allotment never passes the room its last scan recorded per limit type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A withdrawal for a house says, after the items, how many stacks each house is to take.",
    },
  ],
  createdAt: "2026-10-28T20:33:22.031Z",
  updatedAt: "2026-10-28T20:33:22.031Z",
} as const satisfies Module
