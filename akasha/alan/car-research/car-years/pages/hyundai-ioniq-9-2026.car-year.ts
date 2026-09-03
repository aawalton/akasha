import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiIoniq92026 = {
  id: "019e4ae2-ebe0-74c2-b8a1-10f16fd94c4f",
  pageTypeSlug: "car-year",
  slug: "hyundai-ioniq-9-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Launch year. US-built at HMGMA Georgia. 110.3 kWh battery, native NACS port standard. Six trims spanning $58,955-$76,490. Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-9",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-9\n- https://www.hyundaiusa.com/us/en/vehicles/ioniq-9/compare-specs",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-ioniq-9",
} as const satisfies CarYear
