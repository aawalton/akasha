import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiElantraHybrid2026 = {
  id: "019e4ae3-b28d-7ce5-9bc7-334a550e520e",
  pageTypeSlug: "car-year",
  slug: "hyundai-elantra-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Largely carryover from 2025; no major spec changes. Blue trim at $25,450 starting MSRP, 54 mpg combined. Sources: https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid\n- https://www.edmunds.com/hyundai/elantra-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-elantra-hybrid",
} as const satisfies CarYear
