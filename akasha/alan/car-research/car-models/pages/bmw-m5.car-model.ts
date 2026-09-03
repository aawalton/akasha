import type { CarModel } from "../car-model.page-type.ts"

export const bmwM5 = {
  id: "019e4ad8-0c85-7b74-899c-8dcd372fac12",
  pageTypeSlug: "car-model",
  slug: "bmw-m5",
  title: "M5",
  bodyStyle: "sedan",
  generation: "7th gen (G90 sedan / G99 Touring, 2025-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW M5 is BMW M's high-performance variant of the 5 Series, and the 7th-generation M5 (G90) introduced for MY2025 is the first electrified M5 — a plug-in hybrid combining the S68 4.4L twin-turbo V8 with an electric motor for 717 hp / 738 lb-ft via 8-speed automatic and M xDrive AWD. For MY2025 BMW also brought back the M5 Touring (G99) wagon for the first time in the US in over 35 years. 14.8 kWh battery; ~25-27 miles EPA-rated EV range. The MY2026 received an OBC upgrade from 7.4 kW to 11 kW.\n\nSources:\n- https://www.bmwusa.com/vehicles/m-series/m5-series/bmw-m5-touring.html\n- https://www.bmwblog.com/2025/10/04/bmw-m5-2026-specs-pricing/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- BMW USA M5 Touring — https://www.bmwusa.com/vehicles/m-series/m5-series/bmw-m5-touring.html\n- BMW Blog M5 2026 specs — https://www.bmwblog.com/2025/10/04/bmw-m5-2026-specs-pricing/\n- Autoblog 2025 M5 Touring review — https://www.autoblog.com/reviews/2025-bmw-m5-touring-wagon-phev-review\n- Edmunds 2026 M5 — https://www.edmunds.com/bmw/m5/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
