import type { CarYear } from "../car-year.page-type.ts"

export const mazdaCx70Phev2026 = {
  id: "019e4aed-a0a0-7c60-9487-6b25f439bc6d",
  pageTypeSlug: "car-year",
  slug: "mazda-cx-70-phev-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "For 2026 the CX-70 PHEV gets minor packaging revisions in line with the broader CX-70/CX-90 refresh. Trims for 2026: PHEV Preferred and PHEV Premium. Powertrain unchanged from 2025 (2.5L + electric motor, 323 hp, 17.8 kWh battery, EPA-estimated 25-26 mi electric range, ~3,500 lb towing). Sources: https://www.mazdausa.com/vehicles/cx-70-phev/compare-vehicle-specs-and-trims, https://cars.usnews.com/cars-trucks/mazda/cx-70-phev",
  shortList: false,
  sources:
    "- Mazda USA CX-70 PHEV trims: https://www.mazdausa.com/vehicles/cx-70-phev/compare-vehicle-specs-and-trims\n- US News: https://cars.usnews.com/cars-trucks/mazda/cx-70-phev",
  exclusionReason: "All trims excluded",
  carModelSlug: "mazda-cx-70-phev",
} as const satisfies CarYear
