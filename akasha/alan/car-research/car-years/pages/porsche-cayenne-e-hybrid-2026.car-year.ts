import type { CarYear } from "../car-year.page-type.ts"

export const porscheCayenneEHybrid2026 = {
  id: "019e4afa-524f-7089-b92c-ef42d6016590",
  pageTypeSlug: "car-year",
  slug: "porsche-cayenne-e-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover MY26. Minor MSRP increases. Next-gen Cayenne BEV launches alongside late 2026 but the PHEV/ICE Cayenne continues in parallel for several more years. Same PHEV lineup (E-Hybrid, S E-Hybrid, Turbo E-Hybrid) in SUV and Coupe bodies. Source: https://www.porsche.com/usa/models/cayenne/",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/cayenne/cayenne-e-hybrid-models/\n- https://www.caranddriver.com/porsche/cayenne",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-cayenne-e-hybrid",
} as const satisfies CarYear
