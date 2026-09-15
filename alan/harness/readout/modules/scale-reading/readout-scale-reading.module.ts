import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutScaleReading = {
  id: "01a05b54-a904-78de-9a09-417c68322618",
  type: "page-type/module",
  slug: "readout-scale-reading",
  definition: "the rungs a readout scale page states, read from the store",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scale missing a rung the ring needs is no scale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The yellow rung is carried only where the page states the yellow rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store that answers nothing gives no scale.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here draws a ring.",
    },
  ],
} as const satisfies Module
