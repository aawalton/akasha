import type { CarYear } from "../car-year.page-type.ts"

export const toyotaRav4Hybrid2026 = {
  id: "019e4b01-1cd8-76dc-957d-f321396b8b3f",
  pageTypeSlug: "car-year",
  slug: "toyota-rav4-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 is a redesign year. Toyota has stated the entire RAV4 lineup will be electrified (HEV or PHEV only) for MY2026; ICE-only RAV4 discontinued. New styling and infotainment expected; powertrains likely refined versions of current HEV (2.5L+eAWD) and PHEV. Specific specs TBD pending official MY2026 announcement. Source: https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4hybrid/2026/\n- https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-rav4-hybrid",
} as const satisfies CarYear
