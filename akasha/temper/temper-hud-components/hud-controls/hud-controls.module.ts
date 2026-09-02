import type { Module } from "@akasha/code-system/module"

export const hudControls = {
  id: "01a060a4-fa3b-745a-a9a7-a90e32641060",
  pageTypeSlug: "module",
  slug: "hud-controls",
  definition: "the HUD parts that are controls rather than fragments",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part here is hidden by a method called on the control.",
    },
    {
      invariantKind: "departure",
      statement: "Every part here belongs to all three HUD scenes.",
    },
  ],
} as const satisfies Module
