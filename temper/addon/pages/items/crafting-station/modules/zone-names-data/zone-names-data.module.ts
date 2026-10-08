import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesData = {
  id: "01a061e7-9328-7c3a-ad08-a89ab3827af3",
  type: "page-type/module",
  slug: "zone-names-data",
  definition: "every zone's name in each language the library has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each language has the zone names of that language alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Japanese and Polish fall back to English once the library loads.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.576Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
