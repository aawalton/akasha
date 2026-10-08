import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsMundusDescription = {
  id: "01a06269-2ae2-7c0e-9ff7-d798afc9d5d4",
  type: "page-type/module",
  slug: "map-pins-mundus-description",
  definition: "the description of each mundus stone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.562Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
