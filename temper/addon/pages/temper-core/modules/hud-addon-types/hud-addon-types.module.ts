import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonTypes = {
  id: "01a061c5-18dd-7000-bd52-66ec64cec528",
  type: "page-type/module",
  slug: "hud-addon-types",
  definition: "the shapes a HUD field, a HUD cell, a Temper command and the saved variables take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field states the order that field sits in the bar at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell has its own color and its own transparency.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here calls a game function.",
    },
  ],
  createdAt: "2026-09-02T10:58:22.045Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
