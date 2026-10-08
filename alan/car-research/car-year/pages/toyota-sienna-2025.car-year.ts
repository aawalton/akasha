import type { CarYear } from "akasha/alan/car-research/car-year/car-year.page-type.types.ts"

export const toyotaSienna2025 = {
  id: "019e4b0d-d4e1-720b-8761-68fb60c30c8f",
  type: "page-type/car-year",
  slug: "toyota-sienna-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Updated infotainment to Toyota Audio Multimedia. Standard equipment refresh. 25th Anniversary Edition trim added. Source: https://pressroom.toyota.com/2025-toyota-sienna/",
  shortList: false,
  sources: "- https://www.toyota.com/sienna/2025/",
  exclusionReason: "All trims excluded",
  carModel: "car-model/toyota-sienna",
  createdAt: "2026-05-21T15:00:58.209Z",
  updatedAt: "2026-09-15T16:06:42.000Z",
} as const satisfies CarYear
