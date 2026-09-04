import type { CarYear } from "../car-year.page-type.ts"

export const toyotaCamry2026 = {
  id: "019e4b03-9b81-7ce4-97d6-451c85005016",
  pageTypeSlug: "car-year",
  slug: "toyota-camry-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover of 9th-gen Camry from MY2025; minor option re-packaging and incremental pricing. Powertrain unchanged. Source: https://www.toyota.com/camry/2026/",
  shortList: false,
  sources: "- https://www.toyota.com/camry/2026/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-camry",
} as const satisfies CarYear
