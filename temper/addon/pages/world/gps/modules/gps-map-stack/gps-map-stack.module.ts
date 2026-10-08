import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsMapStack = {
  id: "01a0614d-4764-7ec3-ad81-9a7139d4a72a",
  type: "page-type/module",
  slug: "gps-map-stack",
  definition: "the maps left behind to go measure another, so the caller returns to one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A map is pushed with the zoom and offset the map was shown at.",
    },
  ],
  createdAt: "2026-09-02T08:47:29.636Z",
  updatedAt: "2026-09-22T03:58:40.000Z",
} as const satisfies Module
