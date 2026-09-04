import type { CarYear } from "../car-year.page-type.ts"

export const toyotaSienna2025 = {
  id: "019e4b0d-d4e1-720b-8761-68fb60c30c8f",
  pageTypeSlug: "car-year",
  slug: "toyota-sienna-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Updated infotainment to Toyota Audio Multimedia. Standard equipment refresh. 25th Anniversary Edition trim added. Source: https://pressroom.toyota.com/2025-toyota-sienna/",
  shortList: false,
  sources: "- https://www.toyota.com/sienna/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-sienna",
} as const satisfies CarYear
