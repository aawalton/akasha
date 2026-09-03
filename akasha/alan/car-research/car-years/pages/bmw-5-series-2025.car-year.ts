import type { CarYear } from "../car-year.page-type.ts"

export const bmw5Series2025 = {
  id: "019e4ae2-47cc-732d-b9d1-311b42a87591",
  pageTypeSlug: "car-year",
  slug: "bmw-5-series-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 5 Series PHEV variant: 550e xDrive ($73,400 MSRP). 3.0L turbocharged inline-six + e-motor = 483 hp / 516 lb-ft combined. 19.4 kWh battery, ~33 mi EPA EV range. iDrive 8.5 standard.\n\nSources:\n- https://www.bmwofnashville.com/2025-bmw-550e-xdrive-phev-specs-features-model-review-brentwood-tn.htm\n- https://www.edmunds.com/bmw/5-series/2025/plug-in-hybrid/",
  shortList: false,
  sources:
    "- BMW Nashville 2025 550e — https://www.bmwofnashville.com/2025-bmw-550e-xdrive-phev-specs-features-model-review-brentwood-tn.htm\n- Edmunds 2025 5 Series PHEV — https://www.edmunds.com/bmw/5-series/2025/plug-in-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-5-series",
} as const satisfies CarYear
