import type { CarYear } from "../car-year.page-type.ts"

export const bmwI52025 = {
  id: "019e4ada-c456-7bd9-8552-00832623dc77",
  pageTypeSlug: "car-year",
  slug: "bmw-i5-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Second model year of the all-electric i5 sedan after MY2024 launch. Three trims: eDrive40, xDrive40, M60 xDrive. Carries over from MY2024 with minor option-package adjustments. EPA-rated range up to 295 mi (eDrive40), 269 mi (xDrive40), 256 mi (M60).\n\nSources:\n- https://www.bmwbellevue.com/research/2025-bmw-i5-trim-levels.htm",
  shortList: false,
  sources:
    "- BMW dealer trim comparison — https://www.bmwbellevue.com/research/2025-bmw-i5-trim-levels.htm",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-i5",
} as const satisfies CarYear
