import type { CarYear } from "../car-year.page-type.ts"

export const hondaCrVHybrid2025 = {
  id: "019e4ae2-51da-7cfe-b756-a0588585d60c",
  pageTypeSlug: "car-year",
  slug: "honda-cr-v-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover year within the 6th-gen CR-V (2023+). Three hybrid trims: Sport Hybrid (FWD or AWD), Sport-L (AWD), and Sport Touring Hybrid (AWD-only). Two-motor e:HEV system (2.0L + two motors, 204 hp). EPA: 43/36/40 city/hwy/combined (FWD Sport) and 40/34/37 (AWD trims). Honda Sensing safety suite standard, 9-inch touchscreen on Sport Touring.\n\nSources:\n- https://www.edmunds.com/honda/cr-v/2025/hybrid/\n- https://www.kbb.com/honda/cr-v-hybrid/2025/specs/",
  shortList: false,
  sources:
    "- https://www.edmunds.com/honda/cr-v/2025/hybrid/\n- https://www.kbb.com/honda/cr-v-hybrid/2025/specs/\n- https://automobiles.honda.com/2025/cr-v/specs-features-trim-comparison",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-cr-v-hybrid",
} as const satisfies CarYear
