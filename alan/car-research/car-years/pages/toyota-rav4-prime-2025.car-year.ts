import type { CarYear } from "../car-year.page-type.ts"

export const toyotaRav4Prime2025 = {
  id: "019e4b01-c4d9-7b76-80c2-66026fde9de1",
  pageTypeSlug: "car-year",
  slug: "toyota-rav4-prime-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover from MY2024. Minor color and option re-packaging. 6.6 kW onboard charger standard. EPA all-electric range 42 mi. Source: https://pressroom.toyota.com/2025-toyota-rav4-prime/",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4prime/2025/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_RAV4_Prime.shtml",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-rav4-prime",
} as const satisfies CarYear
