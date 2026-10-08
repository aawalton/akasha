import type { CarYear } from "akasha/alan/car-research/car-year/car-year.page-type.types.ts"

export const hyundaiElantraHybrid2025 = {
  id: "019e4ae3-98fd-7a4c-a5f7-d2da32ccc5a2",
  type: "page-type/car-year",
  slug: "hyundai-elantra-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover from 2024 facelift; Blue, SEL Sport, Limited trims. Sources: https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid\n- https://www.edmunds.com/hyundai/elantra-hybrid/",
  exclusionReason: "All trims excluded",
  carModel: "car-model/hyundai-elantra-hybrid",
  createdAt: "2026-05-21T14:14:50.365Z",
  updatedAt: "2026-09-15T16:06:24.000Z",
} as const satisfies CarYear
