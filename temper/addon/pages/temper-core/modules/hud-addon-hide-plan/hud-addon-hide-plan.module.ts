import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonHidePlan = {
  id: "01a061c5-18dd-700b-9e4a-ac33f45c2a8f",
  type: "page-type/module",
  slug: "hud-addon-hide-plan",
  definition: "what hiding to carry out, worked out from the catalog and the player's request",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A registration naming no part in the catalog is left out of the plan.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here touches a game control.",
    },
  ],
  createdAt: "2026-09-02T10:58:22.045Z",
  updatedAt: "2026-09-22T13:49:27.000Z",
} as const satisfies Module
