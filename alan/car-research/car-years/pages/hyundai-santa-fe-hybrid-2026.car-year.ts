import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiSantaFeHybrid2026 = {
  id: "019e4ae3-9119-73d6-8c62-6c3e3c78dfb8",
  pageTypeSlug: "car-year",
  slug: "hyundai-santa-fe-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "New entry-level SE trim added at $36,150, expanding hybrid lineup. Carryover powertrain (231 hp 1.6T hybrid). Sources: https://www.hyundaiusa.com/us/en/vehicles/santa-fe-hybrid",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/santa-fe-hybrid\n- https://www.kbb.com/hyundai/santa-fe-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-santa-fe-hybrid",
} as const satisfies CarYear
