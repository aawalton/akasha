import type { CarYear } from "../car-year.page-type.ts"

export const lexusEs2026 = {
  id: "019e4aeb-a8e9-7fa3-bb91-e8192a901557",
  pageTypeSlug: "car-year",
  slug: "lexus-es-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "All-new 8th-generation ES debuted for 2026. New BEV variants (ES 350e, ES 500e) added alongside hybrid ES 350h. Major redesign with new platform shared with future BEVs. PHEV initially not offered. Sales begin late 2025/early 2026 as a 2026MY. Sources: https://pressroom.lexus.com/all-new-2026-lexus-es-debut/ , https://insideevs.com/news/2026-lexus-es-electric/",
  shortList: false,
  sources:
    "- 2026 Lexus ES pressroom: https://pressroom.lexus.com/all-new-2026-lexus-es-debut/\n- InsideEVs",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-es",
} as const satisfies CarYear
