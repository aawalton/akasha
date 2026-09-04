import type { CarYear } from "../car-year.page-type.ts"

export const toyotaCorollaHybrid2026 = {
  id: "019e4b04-d5b5-7155-bf41-af5ed97d2d04",
  pageTypeSlug: "car-year",
  slug: "toyota-corolla-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover from MY2025; powertrain and trim structure unchanged. Source: https://www.toyota.com/corollahybrid/2026/",
  shortList: false,
  sources: "- https://www.toyota.com/corollahybrid/2026/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-corolla-hybrid",
} as const satisfies CarYear
