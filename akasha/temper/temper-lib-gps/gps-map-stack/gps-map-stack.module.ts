import type { Module } from "@akasha/code-system/module"

export const gpsMapStack = {
  id: "01a0614d-4764-7ec3-ad81-9a7139d4a72a",
  pageTypeSlug: "module",
  slug: "gps-map-stack",
  definition: "the maps left behind to go measure another, so the caller returns to one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A map is pushed with the zoom and offset the map was shown at.",
    },
  ],
} as const satisfies Module
