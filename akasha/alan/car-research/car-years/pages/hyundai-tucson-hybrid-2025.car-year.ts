import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiTucsonHybrid2025 = {
  id: "019e4ae3-24bd-7478-b32a-09c89219bb1f",
  pageTypeSlug: "car-year",
  slug: "hyundai-tucson-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Mid-cycle refresh of 4th-gen Tucson: revised front fascia, redesigned interior with twin 12.3-inch displays replacing the prior 10.25-inch screens, real buttons restored for climate, updated steering wheel, expanded ADAS to standard HDA 2.0. Sources: https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid\n- https://www.kbb.com/hyundai/tucson-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-tucson-hybrid",
} as const satisfies CarYear
