import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiSonataHybrid2025 = {
  id: "019e4ae3-be2f-765b-8b25-e79431928470",
  pageTypeSlug: "car-year",
  slug: "hyundai-sonata-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover from 2024 facelift. Sonata Hybrid trims: SEL Hybrid (base) and Limited Hybrid. Sources: https://www.hyundaiusa.com/us/en/vehicles/2025-sonata",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/sonata\n- https://www.edmunds.com/hyundai/sonata/2025/hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-sonata-hybrid",
} as const satisfies CarYear
