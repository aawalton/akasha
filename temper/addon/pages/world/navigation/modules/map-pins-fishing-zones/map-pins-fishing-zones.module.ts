import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingZones = {
  id: "01a06269-2ac8-7af2-8bbc-2ebe1c6b31e8",
  type: "page-type/module",
  slug: "map-pins-fishing-zones",
  definition: "the fishing zones and their fish",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.536Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
