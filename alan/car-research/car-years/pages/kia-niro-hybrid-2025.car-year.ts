import type { CarYear } from "../car-year.page-type.ts"

export const kiaNiroHybrid2025 = {
  id: "019e4ae9-0da6-7718-81a5-c33fa6e21a9a",
  pageTypeSlug: "car-year",
  slug: "kia-niro-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Five trims (LX, EX, EX Touring, SX, SX Touring). LX/EX achieve 53 mpg combined; EX Touring/SX/SX Touring achieve 49 mpg combined due to 18-inch wheels. LX MSRP ~$26,990. Source: https://www.kia.com/us/en/niro/specs-compare",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/niro/specs-compare\nhttps://www.edmunds.com/kia/niro/2025/trims/\nhttps://www.kiamarin.com/blogs/5392/the-trim-levels-of-the-2025-kia-niro-hybrid",
  exclusionReason: "All trims excluded",
  carModelSlug: "kia-niro-hybrid",
} as const satisfies CarYear
