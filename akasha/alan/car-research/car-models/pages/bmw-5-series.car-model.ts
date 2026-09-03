import type { CarModel } from "../car-model.page-type.ts"

export const bmw5Series = {
  id: "019e4ad7-89e2-792f-8c37-2af7068b1f92",
  pageTypeSlug: "car-model",
  slug: "bmw-5-series",
  title: "5 Series",
  bodyStyle: "sedan",
  generation: "8th gen (G60, 2024-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW 5 Series is BMW's mid-size luxury executive sedan, in its eighth generation (G60) since MY2024. For MY2025 / MY2026 the 5 Series in the US is sold in ICE (530i / 540i mild-hybrid) and PHEV (550e xDrive) variants alongside the BEV i5. The 550e xDrive is the only electrified non-BEV 5 Series trim sold in the US — it pairs BMW's B58 turbocharged inline-six with an electric motor for combined 483 hp / 516 lb-ft and an EPA-rated 33 miles electric range. The M5 (a separate model entry) is the PHEV high-performance variant.\n\nSources:\n- https://www.bmwusa.com/vehicles/5-series/sedan/bmw-5-series-sedan-phev-overview.html\n- https://www.bmwblog.com/2026/02/04/2025-bmw-550e-review/",
  powertrainOptions: ["PHEV", "ICE", "MHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- BMW USA 5 Series PHEV — https://www.bmwusa.com/vehicles/5-series/sedan/bmw-5-series-sedan-phev-overview.html\n- BMW Blog 550e review — https://www.bmwblog.com/2026/02/04/2025-bmw-550e-review/\n- Edmunds 2025 5 Series PHEV — https://www.edmunds.com/bmw/5-series/2025/plug-in-hybrid/\n- KBB 2026 550e — https://www.kbb.com/bmw/5-series/2026/550e-xdrive/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
