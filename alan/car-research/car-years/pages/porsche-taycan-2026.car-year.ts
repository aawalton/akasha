import type { CarYear } from "../car-year.page-type.ts"

export const porscheTaycan2026 = {
  id: "019e4af5-3a9f-7b12-8bab-f4a455aba43e",
  pageTypeSlug: "car-year",
  slug: "porsche-taycan-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover from the 2025 refresh. Minor MY26 changes: standardized features in some trim packages, modest MSRP increases (~1-3%), additional exterior colors, NACS adapter option becomes available via dealer. No powertrain/battery changes. Turbo GT continues. Sport Turismo wagon continues in US. Source: https://www.porsche.com/usa/models/taycan/",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/taycan/\n- https://www.caranddriver.com/porsche/taycan",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-taycan",
} as const satisfies CarYear
