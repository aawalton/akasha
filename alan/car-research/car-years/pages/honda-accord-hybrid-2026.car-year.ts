import type { CarYear } from "../car-year.page-type.ts"

export const hondaAccordHybrid2026 = {
  id: "019e4ae2-3b97-7722-a127-af15699b1698",
  pageTypeSlug: "car-year",
  slug: "honda-accord-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 refresh: standard 9-inch touchscreen across every trim (was 12.3-inch only on top trims previously; lower trims got the 9-inch as an upgrade), wireless Apple CarPlay / Android Auto standard, and wireless phone charger standard. Sport Hybrid and Sport-L Hybrid add black exterior accents (window trim on Sport, black decklid badging, gloss-black B-pillar trim, black mirrors, black shark-fin antenna). Powertrain unchanged. Hybrid pricing: Sport $33,795, EX-L $35,095, Sport-L $35,495, Touring $39,495.\n\nSources:\n- https://hondanews.com/en-US/honda-automobiles/releases/release-c26685400737027f7d053958c30909ed-2026-honda-accord-adds-more-standard-tech-and-sportier-styling-now-arriving-at-dealers\n- https://www.edmunds.com/honda/accord/2026/hybrid/",
  shortList: false,
  sources:
    "- https://hondanews.com/en-US/honda-automobiles/releases/release-c26685400737027f7d053958c30909ed-2026-honda-accord-adds-more-standard-tech-and-sportier-styling-now-arriving-at-dealers\n- https://www.edmunds.com/honda/accord/2026/hybrid/\n- https://automobiles.honda.com/tools/build-and-price-trimwalk?modelseries=accord-sedan&modelyear=2026",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-accord-hybrid",
} as const satisfies CarYear
