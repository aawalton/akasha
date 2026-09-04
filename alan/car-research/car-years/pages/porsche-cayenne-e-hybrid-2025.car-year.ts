import type { CarYear } from "../car-year.page-type.ts"

export const porscheCayenneEHybrid2025 = {
  id: "019e4af8-e915-72e0-9374-1f4f16eacf1b",
  pageTypeSlug: "car-year",
  slug: "porsche-cayenne-e-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    'Continuation of 2024 mid-cycle refresh. PHEV lineup: Cayenne E-Hybrid ($96,300), Cayenne S E-Hybrid ($101,400, MY24+), Cayenne Turbo E-Hybrid ($150,300). Coupe variants priced ~$5-8k above SUV equivalents. Larger 25.9 kWh battery (vs prior 17.9 kWh), 11 kW AC charger. New Porsche Driver Experience dash (12.6" curved cluster + 12.3" center + optional 10.9" passenger display). Driver-attention camera new for 2024+. Source: https://newsroom.porsche.com/en_US/products/cayenne/cayenne-2024-update-32841.html',
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/cayenne/cayenne-e-hybrid-models/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=46735\n- https://www.caranddriver.com/porsche/cayenne-e-hybrid/specs/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-cayenne-e-hybrid",
} as const satisfies CarYear
