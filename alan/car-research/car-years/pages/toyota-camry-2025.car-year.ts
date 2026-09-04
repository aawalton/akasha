import type { CarYear } from "../car-year.page-type.ts"

export const toyotaCamry2025 = {
  id: "019e4b02-d9bf-7a92-bb78-3a292d94ec28",
  pageTypeSlug: "car-year",
  slug: "toyota-camry-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Complete 9th-gen redesign launch. All-hybrid lineup; V6 and ICE-only 4-cyl discontinued. New TNGA-K platform. Toyota Audio Multimedia standard. Available LE, SE, XLE, XSE in FWD; AWD optional on all. Source: https://pressroom.toyota.com/2025-toyota-camry/",
  shortList: false,
  sources:
    "- https://www.toyota.com/camry/2025/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Camry.shtml",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-camry",
} as const satisfies CarYear
