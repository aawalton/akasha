import type { CarYear } from "../car-year.page-type.ts"

export const bmwI72026 = {
  id: "019e4adc-71e3-7549-a59b-a4645126736d",
  pageTypeSlug: "car-year",
  slug: "bmw-i7-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 carries over the three-trim lineup with modest content updates: eDrive50 ($105,700), xDrive60 ($124,200), M70 xDrive ($168,500). Range estimates 314 / 296 / 285 mi respectively. Minor pricing adjustments on xDrive60 (+$3,700) and M70 (+$1,000) vs MY2025.\n\nSources:\n- https://www.edmunds.com/bmw/i7/\n- https://cars.usnews.com/cars-trucks/bmw/i7/2026",
  shortList: false,
  sources:
    "- Edmunds 2026 i7 — https://www.edmunds.com/bmw/i7/\n- US News 2026 i7 — https://cars.usnews.com/cars-trucks/bmw/i7/2026\n- Autoblog 2026 i7 — https://www.autoblog.com/cars/bmw/i7/2026",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-i7",
} as const satisfies CarYear
