import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersState = {
  id: "01a0de85-2b4c-72ee-b076-8ac1e64c1c9b",
  type: "page-type/module",
  slug: "markers-state",
  definition:
    "the markers loaded in the zone, the player's saved markers and what the settings chose",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A marker a player places is saved to the profile loaded for the zone the player stands in.",
    },
  ],
  createdAt: "2026-09-26T16:21:04.460Z",
  updatedAt: "2026-09-26T16:21:52.000Z",
} as const satisfies Module
