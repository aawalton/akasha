import type { CarYear } from "../car-year.page-type.ts"

export const toyotaPrius2025 = {
  id: "019e4afc-1674-7f02-bc3d-84d21fb5373d",
  pageTypeSlug: "car-year",
  slug: "toyota-prius-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Minor changes from MY2024. Plug-in 'Prius Prime' tracked separately. MY2025 added the Nightshade Edition. Standard equipment levels improved slightly; pricing edged up. Toyota Safety Sense 3.0 standard. Source: https://pressroom.toyota.com/2025-toyota-prius-pricing/",
  shortList: false,
  sources:
    "- https://www.toyota.com/prius/2025/\n- https://pressroom.toyota.com/2025-toyota-prius-pricing/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Prius.shtml",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-prius",
} as const satisfies CarYear
