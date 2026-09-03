import type { CarYear } from "../car-year.page-type.ts"

export const bmwI72025 = {
  id: "019e4adc-616a-7ed0-ad47-ecb8b79058e4",
  pageTypeSlug: "car-year",
  slug: "bmw-i7-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added the new eDrive50 RWD base trim, replacing the prior xDrive60-only base config. Three trims: eDrive50, xDrive60, M70 xDrive. Pricing: eDrive50 $105,700; xDrive60 ~$120,500; M70 ~$167,500 (excluding $1,550 destination).\n\nSources:\n- https://cars.usnews.com/cars-trucks/bmw/i7\n- https://www.bmwofmountainview.com/research/2025-bmw-i7-trim-levels.htm",
  shortList: false,
  sources:
    "- US News 2025 i7 — https://cars.usnews.com/cars-trucks/bmw/i7\n- Mountain View BMW trim comparison — https://www.bmwofmountainview.com/research/2025-bmw-i7-trim-levels.htm",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-i7",
} as const satisfies CarYear
