import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const passiveEffects = {
  id: "01a05fcf-2469-73b4-a32a-44ca09660ace",
  type: "page-type/page-property-entry",
  slug: "passive-effects",
  propertySlug: "passive-effects",
  definition: "what a companion's own passive moves, one metric to a line",
  properties: [
    { pageProperty: "relation-property/companion-metric", required: true, many: false },
    { pageProperty: "number-property/effect-value", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:50:05.929Z",
  updatedAt: "2026-09-24T14:30:29.000Z",
} as const satisfies PagePropertyEntry
