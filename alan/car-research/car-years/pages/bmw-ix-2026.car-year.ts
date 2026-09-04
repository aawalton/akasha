import type { CarYear } from "../car-year.page-type.ts"

export const bmwIx2026 = {
  id: "019e4ade-0833-7154-9e96-29181735fa63",
  pageTypeSlug: "car-year",
  slug: "bmw-ix-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major MY2026 refresh: BMW added a new xDrive45 entry trim ($75,150), upgraded the mid-tier to xDrive60 with larger 113.4 kWh battery and 536 hp ($88,500), and replaced the M60 with the new M70 xDrive (650 hp, 112.8 kWh battery, $111,500). Range jumps significantly: xDrive60 to 364 mi, M70 to 280-303 mi. Faster DC charging supported. Starting MSRP dropped $12,100 from MY2025 entry.\n\nSources:\n- https://www.edmunds.com/bmw/ix/\n- https://www.kbb.com/bmw/ix/\n- https://www.jdpower.com/cars/expert-reviews/2026-bmw-ix-review-update",
  shortList: false,
  sources:
    "- Edmunds 2026 iX — https://www.edmunds.com/bmw/ix/\n- KBB 2026 iX — https://www.kbb.com/bmw/ix/\n- JD Power 2026 iX review — https://www.jdpower.com/cars/expert-reviews/2026-bmw-ix-review-update",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-ix",
} as const satisfies CarYear
