import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiIoniq5N2025 = {
  id: "019e4ae2-a5da-755d-8cb4-2be8d614a43d",
  pageTypeSlug: "car-year",
  slug: "hyundai-ioniq-5-n-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover from 2024 debut model year. CCS1 port retained. Single trim ('N'). Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-5-n",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5-n\n- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5-n/compare-specs",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-ioniq-5-n",
} as const satisfies CarYear
