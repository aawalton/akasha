import type { CarYear } from "../car-year.page-type.ts"

export const bmwI42025 = {
  id: "019e4ad8-7b77-74fc-944c-100ac72ce1d6",
  pageTypeSlug: "car-year",
  slug: "bmw-i4-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    'Carried over from MY2024 largely unchanged. Three trims: eDrive40, xDrive40, M50. Standard iDrive 8.5 curved display. EPA-rated range up to 307 mi (eDrive40 with 18" wheels), 287 mi (xDrive40), 269 mi (M50). MSRPs roughly: eDrive40 $57,300 / xDrive40 $61,700 / M50 $70,300 (excluding $1,175 destination).\n\nSources:\n- https://www.bmwcarlsbad.com/research/2025-bmw-i4-trim-levels.htm\n- https://cars.usnews.com/cars-trucks/bmw/i4',
  shortList: false,
  sources:
    "- US News 2025 i4 — https://cars.usnews.com/cars-trucks/bmw/i4\n- BMW dealer trim comparison — https://www.bmwcarlsbad.com/research/2025-bmw-i4-trim-levels.htm",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-i4",
} as const satisfies CarYear
