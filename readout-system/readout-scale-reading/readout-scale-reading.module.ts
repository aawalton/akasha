import type { Module } from "@akasha/code-system/module"

export const readoutScaleReading = {
  id: "01a05b54-a904-78de-9a09-417c68322618",
  pageTypeSlug: "module",
  slug: "readout-scale-reading",
  definition: "the rungs a readout scale page states, read from the store",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scale missing a rung the ring needs is no scale.",
    },
    {
      invariantKind: "departure",
      statement: "The yellow rung is carried only where the page states the yellow rung.",
    },
    {
      invariantKind: "departure",
      statement: "A store that answers nothing gives no scale.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a ring.",
    },
  ],
} as const satisfies Module
