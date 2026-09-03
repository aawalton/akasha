import type { CarYear } from "../car-year.page-type.ts"

export const gmcSierraEv2026 = {
  id: "019e4adf-ecb3-702d-8a56-abbfb779c2b9",
  pageTypeSlug: "car-year",
  slug: "gmc-sierra-ev-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "2026 Sierra EV broadens the lineup: adds Elevation (entry) and AT4 (off-road) trims joining Denali. New pricing: Elevation from $64,495 MSRP, Denali from $71,795, AT4 from $81,395 (all incl. $2,095 destination). Three battery options (Standard, Extended, Max Range). Elevation = Std/Ext only, AT4 = Ext/Max only, Denali = all three. Range up to 410 mi (Elevation) / 478 mi (AT4 + Denali, GM-estimated). Native NACS port added. Bi-directional charging. Expected at dealers summer 2026. Sources: https://news.gm.com/home.detail.html/Pages/news/us/en/2025/mar/0327-2026-gmc-sierra-ev.html ; https://electrek.co/2025/06/27/gmc-sierra-ev-pickup-way-more-affordable/ ; https://www.gmc.com/electric/sierra-ev",
  shortList: false,
  sources:
    "- https://news.gm.com/home.detail.html/Pages/news/us/en/2025/mar/0327-2026-gmc-sierra-ev.html\n- https://electrek.co/2025/06/27/gmc-sierra-ev-pickup-way-more-affordable/\n- https://www.gmc.com/electric/sierra-ev\n- https://www.edmunds.com/gmc/sierra-ev/\n- https://cars.usnews.com/cars-trucks/gmc/sierra-ev",
  exclusionReason: "All trims excluded",
  carModelSlug: "gmc-sierra-ev",
} as const satisfies CarYear
