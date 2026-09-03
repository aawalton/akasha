import type { CarYear } from "../car-year.page-type.ts"

export const porschePanameraEHybrid2026 = {
  id: "019e4afc-7187-70ed-b589-b5ee34501572",
  pageTypeSlug: "car-year",
  slug: "porsche-panamera-e-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover MY26. Minor MSRP and option-package adjustments. Same PHEV lineup: 4 E-Hybrid, 4S E-Hybrid, Turbo E-Hybrid, Turbo S E-Hybrid. Source: https://www.porsche.com/usa/models/panamera/",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/panamera/panamera-e-hybrid-models/\n- https://www.caranddriver.com/porsche/panamera",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-panamera-e-hybrid",
} as const satisfies CarYear
