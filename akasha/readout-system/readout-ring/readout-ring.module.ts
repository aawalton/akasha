import type { Module } from "@akasha/code-system/module"

export const readoutRing = {
  id: "01a05b1a-4c00-7000-9d21-6f0f1a3c7b40",
  pageTypeSlug: "module",
  slug: "readout-ring",
  definition: "a reading drawn in a browser as a ring colored by the rung it reached",
  code: "tsx",
  test: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading takes the rung stating the greatest number the reading has reached.",
    },
    {
      invariantKind: "departure",
      statement: "A reading below every rung a scale states reaches no rung.",
    },
    {
      invariantKind: "departure",
      statement: "Two rungs stating one number are settled in favour of the graver.",
    },
    {
      invariantKind: "departure",
      statement: "The arc runs from the least rung a scale states to the greatest.",
    },
    {
      invariantKind: "departure",
      statement: "A scale stating fewer than two rungs sweeps nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The rung a reading reached is written on the figure rather than as a color.",
    },
    {
      invariantKind: "absence",
      statement: "No color is stated here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or takes a reading.",
    },
    {
      invariantKind: "gap",
      statement: "The ring the widgets draw in SwiftUI and this one are read from one page.",
    },
  ],
} as const satisfies Module
