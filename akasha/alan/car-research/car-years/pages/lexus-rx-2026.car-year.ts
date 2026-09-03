import type { CarYear } from "../car-year.page-type.ts"

export const lexusRx2026 = {
  id: "019e4aea-6265-7d53-a6bf-13b78313de97",
  pageTypeSlug: "car-year",
  slug: "lexus-rx-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "2026 RX carries over with minor updates. Price increases ~$500-1000 across lineup. Lineup unchanged: RX 350h, RX 450h+ PHEV, RX 500h F SPORT Performance electrified. Source: https://www.lexus.com/models/RX",
  shortList: false,
  sources: "- Lexus 2026 RX",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-rx",
} as const satisfies CarYear
