import type { CarYear } from "../car-year.page-type.ts"

export const toyotaRav4Hybrid2025 = {
  id: "019e4b00-4cd4-73a9-8641-bbb31a8a8ef3",
  pageTypeSlug: "car-year",
  slug: "toyota-rav4-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover of 5th-gen XA50 platform; minor color/option changes. Last year before the planned MY2026 RAV4 redesign (XA60 / 6th-gen). All MY2025 RAV4 Hybrids retain 2.5L+eAWD HEV powertrain, 39-40 mpg combined. Source: https://pressroom.toyota.com/2025-toyota-rav4-hybrid/",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4hybrid/2025/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_RAV4_Hybrid.shtml",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-rav4-hybrid",
} as const satisfies CarYear
