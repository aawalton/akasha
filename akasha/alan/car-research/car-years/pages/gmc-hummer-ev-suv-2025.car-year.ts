import type { CarYear } from "../car-year.page-type.ts"

export const gmcHummerEvSuv2025 = {
  id: "019e4adf-a068-71c1-9da4-80fb8638ec26",
  pageTypeSlug: "car-year",
  slug: "gmc-hummer-ev-suv-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 Hummer EV SUV carryover from 2024 with 2X and 3X trims. CCS1 charging port; Tesla Supercharger access via the GM-approved NACS adapter. Sources: https://www.gmc.com/electric/previous-year/hummer-ev/suv ; https://cars.usnews.com/cars-trucks/gmc/hummer-ev-suv",
  shortList: false,
  sources:
    "- https://www.gmc.com/electric/previous-year/hummer-ev/suv\n- https://www.crestmontbuickgmc.com/gmc-hummer-ev-suv-model-review-beachwood-oh/\n- https://cars.usnews.com/cars-trucks/gmc/hummer-ev-suv",
  exclusionReason: "All trims excluded",
  carModelSlug: "gmc-hummer-ev-suv",
} as const satisfies CarYear
