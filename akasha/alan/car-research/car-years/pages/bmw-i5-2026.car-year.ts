import type { CarYear } from "../car-year.page-type.ts"

export const bmwI52026 = {
  id: "019e4ada-d0f8-743b-88f3-db37b439257a",
  pageTypeSlug: "car-year",
  slug: "bmw-i5-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 includes minor option-package shuffles and price adjustments. Three trims retained: eDrive40 ($67,100), xDrive40 ($70,100), M60 xDrive ($84,100). Range estimates: eDrive40 up to 310 mi; xDrive40 up to 278 mi; M60 up to 277 mi.\n\nSources:\n- https://www.edmunds.com/bmw/i5/\n- https://cars.usnews.com/cars-trucks/bmw/i5",
  shortList: false,
  sources:
    "- Edmunds 2026 i5 — https://www.edmunds.com/bmw/i5/\n- US News 2026 i5 — https://cars.usnews.com/cars-trucks/bmw/i5",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-i5",
} as const satisfies CarYear
