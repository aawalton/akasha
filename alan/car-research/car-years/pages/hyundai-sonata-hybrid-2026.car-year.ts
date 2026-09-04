import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiSonataHybrid2026 = {
  id: "019e4ae3-ce93-7474-b3d1-4ae9a6a4a1e9",
  pageTypeSlug: "car-year",
  slug: "hyundai-sonata-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "New Blue trim replaces SEL as Sonata Hybrid base. Three trims: Blue $29,050, SEL $32,300, Limited $38,100 (excl. $1,245 destination). Sources: https://www.hyundaiusa.com/us/en/vehicles/sonata ; https://cars.usnews.com/cars-trucks/hyundai/sonata-hybrid",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/sonata\n- https://cars.usnews.com/cars-trucks/hyundai/sonata-hybrid\n- https://www.kbb.com/hyundai/sonata-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-sonata-hybrid",
} as const satisfies CarYear
