import type { CarYear } from "../car-year.page-type.ts"

export const toyotaPrius2026 = {
  id: "019e4afd-d554-79d5-9f7d-67600c8ed35f",
  pageTypeSlug: "car-year",
  slug: "toyota-prius-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Largely a carryover from MY2025; minor option re-packaging and incremental price changes. Powertrain unchanged. Same 5th-gen XW60 platform. Source: https://www.toyota.com/prius/2026/ ; https://pressroom.toyota.com/2026-toyota-prius/",
  shortList: false,
  sources:
    "- https://www.toyota.com/prius/2026/\n- https://pressroom.toyota.com/2026-toyota-prius/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-prius",
} as const satisfies CarYear
