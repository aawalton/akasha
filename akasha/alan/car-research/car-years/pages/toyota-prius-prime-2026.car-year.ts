import type { CarYear } from "../car-year.page-type.ts"

export const toyotaPriusPrime2026 = {
  id: "019e4aff-bfae-718c-b700-5f755c644a04",
  pageTypeSlug: "car-year",
  slug: "toyota-prius-prime-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover from MY2025; minor price adjustments and option re-packaging expected. Powertrain unchanged. Source: https://www.toyota.com/priusprime/2026/",
  shortList: false,
  sources:
    "- https://www.toyota.com/priusprime/2026/\n- https://pressroom.toyota.com/2026-toyota-prius-prime/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-prius-prime",
} as const satisfies CarYear
