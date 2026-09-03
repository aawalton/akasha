import type { CarYear } from "../car-year.page-type.ts"

export const porschePanameraEHybrid2025 = {
  id: "019e4afb-4ec3-799c-a0bf-11f0aadc940a",
  pageTypeSlug: "car-year",
  slug: "porsche-panamera-e-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Third-generation Panamera continues into its second full MY in the US. PHEV trims: 4 E-Hybrid, 4S E-Hybrid (new for G3), Turbo E-Hybrid, Turbo S E-Hybrid. Major changes vs G2: larger 25.9 kWh battery, ~32 mi EPA EV range, 11 kW AC charger, new Porsche Active Ride active hydraulic suspension (optional), Porsche Driver Experience cabin layout. Source: https://newsroom.porsche.com/en_US/products/panamera/new-panamera-2023-34197.html",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/panamera/panamera-e-hybrid-models/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=47350\n- https://www.caranddriver.com/porsche/panamera-e-hybrid/specs/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-panamera-e-hybrid",
} as const satisfies CarYear
