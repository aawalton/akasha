import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutScaleReading = {
  id: "01a05b54-a904-78de-9a09-417c68322618",
  type: "page-type/module",
  slug: "readout-scale-reading",
  definition: "how code reads a readout scale from the store",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scale missing a rung the ring needs is no scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The yellow rung is carried only where the page states the yellow rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store that answers nothing gives no scale.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a ring.",
    },
  ],
  createdAt: "2026-09-01T04:57:50.084Z",
  updatedAt: "2026-10-30T16:23:44.113Z",
} as const satisfies Module
