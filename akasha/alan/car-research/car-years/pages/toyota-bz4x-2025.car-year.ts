import type { CarYear } from "../car-year.page-type.ts"

export const toyotaBz4x2025 = {
  id: "019e4af8-7834-7849-b1bc-990b2f6f174a",
  pageTypeSlug: "car-year",
  slug: "toyota-bz4x-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added Nightshade Edition trim (blackout treatment), made Toyota Audio Multimedia with cloud nav standard, increased FWD range to 252 mi (from 242 mi MY2024) via revised motor calibration. Pricing increased modestly (~$1,000). NACS port still not present; CCS1 retained. Source: https://pressroom.toyota.com/2025-toyota-bz4x-pricing/",
  shortList: true,
  sources:
    "- https://pressroom.toyota.com/2025-toyota-bz4x-pricing/\n- https://www.toyota.com/bz4x/2025/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=46086",
  carModelSlug: "toyota-bz4x",
} as const satisfies CarYear
