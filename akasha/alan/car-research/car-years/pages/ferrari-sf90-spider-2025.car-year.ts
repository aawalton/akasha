import type { CarYear } from "../car-year.page-type.ts"

export const ferrariSf90Spider2025 = {
  id: "019e4adb-b675-77f8-bdef-34d2731c4aac",
  pageTypeSlug: "car-year",
  slug: "ferrari-sf90-spider-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Final production MY for the SF90 Spider. Same hardware as the closing-out Stradale; retractable hardtop adds ~100 kg. Sources: https://www.cars.com/research/ferrari-sf90_spider-2025/, https://www.jdpower.com/cars/2025/ferrari/sf90-spider",
  shortList: false,
  sources:
    "- https://www.cars.com/research/ferrari-sf90_spider-2025/\n- https://www.jdpower.com/cars/2025/ferrari/sf90-spider\n- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale",
  exclusionReason: "All trims excluded",
  carModelSlug: "ferrari-sf90-spider",
} as const satisfies CarYear
