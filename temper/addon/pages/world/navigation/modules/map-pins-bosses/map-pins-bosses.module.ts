import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsBosses = {
  id: "01a06269-2a4d-7a4c-9b61-631eb4560cd7",
  type: "page-type/module",
  slug: "map-pins-bosses",
  definition: "the world boss places by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.413Z",
  updatedAt: "2026-09-22T14:15:16.000Z",
} as const satisfies Module
