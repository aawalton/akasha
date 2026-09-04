import type { CarYear } from "../car-year.page-type.ts"

export const mazdaCx70Phev2025 = {
  id: "019e4aed-8c1e-7391-b9c6-c4f6d7b6379a",
  pageTypeSlug: "car-year",
  slug: "mazda-cx-70-phev-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Launch year for the CX-70 PHEV; debuted alongside the CX-70 inline-6 for MY2025. Inherits the CX-90 PHEV powertrain (323 hp, 369 lb-ft, 17.8 kWh battery, 26-mile EPA EV range). Affected by the 2025 inverter-software recall (loss of drive power in EV mode). Trims at launch: Preferred and Premium Plus (some markets list Premium Sport instead of Premium Plus). Sources: https://www.mazdausa.com/vehicles/cx-70-phev, https://www.consumerreports.org/cars/car-recalls-defects/mazda-cx-90-and-cx-70-recalled-for-software-related-problems-a4795490684/",
  shortList: false,
  sources:
    "- Mazda USA CX-70 PHEV: https://www.mazdausa.com/vehicles/cx-70-phev\n- Cars.com 2025: https://www.cars.com/research/mazda-cx_70_phev-2025/\n- Consumer Reports recall coverage: https://www.consumerreports.org/cars/car-recalls-defects/mazda-cx-90-and-cx-70-recalled-for-software-related-problems-a4795490684/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mazda-cx-70-phev",
} as const satisfies CarYear
