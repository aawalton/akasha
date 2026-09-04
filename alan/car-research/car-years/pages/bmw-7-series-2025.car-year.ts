import type { CarYear } from "../car-year.page-type.ts"

export const bmw7Series2025 = {
  id: "019e4ae3-1ff1-764c-b058-adde04ced904",
  pageTypeSlug: "car-year",
  slug: "bmw-7-series-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 7 Series PHEV variant: 750e xDrive ($107,900). 3.0L turbocharged inline-six + e-motor = 483 hp / 516 lb-ft combined. 19.4 kWh battery, ~33 mi EPA EV range. iDrive 8.5 standard.\n\nSources:\n- https://www.cars.com/research/bmw-750e-2025/",
  shortList: false,
  sources:
    "- Cars.com 2025 750e — https://www.cars.com/research/bmw-750e-2025/\n- Edmunds 2025 — https://www.edmunds.com/bmw/7-series/2025/plug-in-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-7-series",
} as const satisfies CarYear
