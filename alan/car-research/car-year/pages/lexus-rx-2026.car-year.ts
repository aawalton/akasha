import type { CarYear } from "akasha/alan/car-research/car-year/car-year.page-type.types.ts"

export const lexusRx2026 = {
  id: "019e4aea-6265-7d53-a6bf-13b78313de97",
  type: "page-type/car-year",
  slug: "lexus-rx-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "2026 RX carries over with minor updates. Price increases ~$500-1000 across lineup. Lineup unchanged: RX 350h, RX 450h+ PHEV, RX 500h F SPORT Performance electrified. Source: https://www.lexus.com/models/RX",
  shortList: false,
  sources: "- Lexus 2026 RX",
  exclusionReason: "All trims excluded",
  carModel: "car-model/lexus-rx",
  createdAt: "2026-05-21T14:22:15.141Z",
  updatedAt: "2026-09-15T16:06:24.000Z",
} as const satisfies CarYear
