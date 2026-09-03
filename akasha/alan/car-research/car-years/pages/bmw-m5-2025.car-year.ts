import type { CarYear } from "../car-year.page-type.ts"

export const bmwM52025 = {
  id: "019e4ae0-42d5-7a51-9e44-53299897afea",
  pageTypeSlug: "car-year",
  slug: "bmw-m5-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "All-new G90 M5 sedan and G99 M5 Touring debut for MY2025 as BMW's first electrified (PHEV) M5. 4.4L S68 V8 + e-motor = 717 hp / 738 lb-ft, 14.8 kWh battery, ~25-27 mi EPA EV range. Sedan MSRP $119,500; Touring MSRP $121,500 (excluding destination).\n\nSources:\n- https://www.autoblog.com/reviews/2025-bmw-m5-touring-wagon-phev-review",
  shortList: false,
  sources:
    "- Autoblog 2025 M5 Touring — https://www.autoblog.com/reviews/2025-bmw-m5-touring-wagon-phev-review",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-m5",
} as const satisfies CarYear
