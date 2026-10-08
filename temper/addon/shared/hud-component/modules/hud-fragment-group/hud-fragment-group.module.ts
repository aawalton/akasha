import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudFragmentGroup = {
  id: "01a060a4-fa3a-751e-a08d-fa06474540f8",
  type: "page-type/module",
  slug: "hud-fragment-group",
  definition: "the HUD parts the game's own fragment group holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every part here belongs to all three HUD scenes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part here is hidden through the fragment group.",
    },
  ],
  createdAt: "2026-09-02T05:43:39.834Z",
  updatedAt: "2026-09-21T22:10:28.000Z",
} as const satisfies Module
