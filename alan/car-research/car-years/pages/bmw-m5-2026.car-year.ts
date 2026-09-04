import type { CarYear } from "../car-year.page-type.ts"

export const bmwM52026 = {
  id: "019e4ae0-5651-7507-a34b-02850d4ddb03",
  pageTypeSlug: "car-year",
  slug: "bmw-m5-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 M5 carries the G90 sedan ($123,300) and G99 Touring ($125,300) with a key upgrade: on-board charger increased from 7.4 kW to 11 kW, halving Level 2 home charge time. Powertrain unchanged at 717 hp / 738 lb-ft. EPA EV range 27 mi sedan / 25 mi Touring.\n\nSources:\n- https://www.bmwblog.com/2025/10/04/bmw-m5-2026-specs-pricing/\n- https://www.edmunds.com/bmw/m5/",
  shortList: false,
  sources:
    "- BMW Blog 2026 M5 — https://www.bmwblog.com/2025/10/04/bmw-m5-2026-specs-pricing/\n- Edmunds 2026 M5 — https://www.edmunds.com/bmw/m5/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-m5",
} as const satisfies CarYear
