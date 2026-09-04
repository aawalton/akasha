import type { CarYear } from "../car-year.page-type.ts"

export const lexusNx2026 = {
  id: "019e4ae9-21fe-70bd-8fe0-9e838d0acf23",
  pageTypeSlug: "car-year",
  slug: "lexus-nx-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "2026 NX continues with minor updates. Lineup unchanged with NX 350h hybrid and NX 450h+ PHEV electrified versions. Pricing inched up ~$500-$1000. Source: https://www.lexus.com/models/NX",
  shortList: false,
  sources: "- Lexus 2026 NX: https://www.lexus.com/models/NX",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-nx",
} as const satisfies CarYear
