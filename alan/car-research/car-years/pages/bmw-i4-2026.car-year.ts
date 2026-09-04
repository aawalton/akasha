import type { CarYear } from "../car-year.page-type.ts"

export const bmwI42026 = {
  id: "019e4ad8-9566-7d44-b4cd-cb201053065a",
  pageTypeSlug: "car-year",
  slug: "bmw-i4-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 refresh: more power, longer range, no price increase. The eDrive40 now exceeds 300 miles EPA range across all wheel sizes (up to 333 mi). The performance M50 is renamed M60 with power bumped to 591 hp and 0-60 in 3.6 s. xDrive40 power up to 396 hp. New tech features added without MSRP changes from MY2025. Prices: eDrive40 $57,900 / xDrive40 $62,300 / M60 $70,700 (excluding destination).\n\nSources:\n- https://www.press.bmwgroup.com/usa/article/detail/T0453773EN_US/\n- https://www.bmwblog.com/2025/12/11/2026-bmw-i4-power-range-updates/",
  shortList: false,
  sources:
    "- BMW press 2026 i4 — https://www.press.bmwgroup.com/usa/article/detail/T0453773EN_US/\n- BMW Blog 2026 i4 — https://www.bmwblog.com/2025/12/11/2026-bmw-i4-power-range-updates/\n- Edmunds — https://www.edmunds.com/bmw/i4/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-i4",
} as const satisfies CarYear
