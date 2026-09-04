import type { CarYear } from "../car-year.page-type.ts"

export const nissanAriya2025 = {
  id: "019e4af2-6bcd-72fb-a127-f6fc82d77091",
  pageTypeSlug: "car-year",
  slug: "nissan-ariya-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 is the final production year of the Ariya in the US. Pricing reduced and trims reshuffled vs. MY2024; six trims offered: Engage (FWD), Engage e-4ORCE (AWD), Evolve+ (FWD), Engage+ e-4ORCE (AWD), Evolve+ e-4ORCE (AWD), Platinum+ e-4ORCE (AWD). Complimentary NACS adapter access to Tesla Supercharger network became available December 2024 via dealer-provided adapter (separate $235 purchase). Sources: https://www.edmunds.com/nissan/ariya/2025/trims/ ; https://usa.nissannews.com/en-US/releases/nissan-energy-charge-network-adds-access-to-17800-tesla-superchargers",
  shortList: true,
  sources:
    "- Edmunds 2025 Ariya trims: https://www.edmunds.com/nissan/ariya/2025/trims/\n- Nissan USA: https://www.nissanusa.com/vehicles/electric-cars/ariya/specs-trims.html\n- U.S. News: https://cars.usnews.com/cars-trucks/nissan/ariya\n- Brochure: https://www.nissanusa.com/content/dam/Nissan/us/vehicle-brochures/2025/2025-nissan-ariya-brochure-en.pdf",
  carModelSlug: "nissan-ariya",
} as const satisfies CarYear
