import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiTucsonHybrid2026 = {
  id: "019e4ae3-3412-70ba-a80f-1573a295e200",
  pageTypeSlug: "car-year",
  slug: "hyundai-tucson-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "New Blue SE base trim added (~$32,200, 38/38/38 mpg), lowering entry price by $1,160. Carryover otherwise. Sources: https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid ; https://www.edmunds.com/hyundai/tucson/2026/hybrid/",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid\n- https://www.edmunds.com/hyundai/tucson/2026/hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-tucson-hybrid",
} as const satisfies CarYear
