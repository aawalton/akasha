import type { CarYear } from "../car-year.page-type.ts"

export const kiaSportageHybrid2025 = {
  id: "019e4aea-cff9-76fc-b641-613c6cf69f78",
  pageTypeSlug: "car-year",
  slug: "kia-sportage-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Three trims (LX FWD/AWD, EX AWD, SX Prestige AWD). LX from $30,185. 1.6T-hybrid powertrain 227 hp / 258 lb-ft. LX FWD 43 mpg combined; EX/SX Prestige AWD 38 mpg combined. Source: https://www.kbb.com/kia/sportage-hybrid/2025/",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/sportage-hybrid/specs-compare\nhttps://www.kbb.com/kia/sportage-hybrid/2025/\nhttps://www.edmunds.com/kia/sportage-hybrid/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "kia-sportage-hybrid",
} as const satisfies CarYear
