import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsInstruments = {
  id: "01a06269-2acb-7131-a13b-1d6645bb0430",
  type: "page-type/module",
  slug: "map-pins-instruments",
  definition: "the instrument places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.539Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
