import type { CarYear } from "../car-year.page-type.ts"

export const lexusRz2025 = {
  id: "019e4ae6-106b-76f6-b9a6-0338bf84d5b1",
  pageTypeSlug: "car-year",
  slug: "lexus-rz-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 RZ continues the original lineup with RZ 300e (FWD, single motor) and RZ 450e (AWD, dual motor) trims. Price increases of $1,000-1,500 vs 2024. EPA range: 220 mi (Premium FWD), 196 mi (Luxury AWD). Sources: https://www.lexus.com/models/RZ/2025 , https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=46519",
  shortList: false,
  sources: "- Lexus 2025 RZ: https://www.lexus.com/models/RZ\n- EPA fueleconomy.gov 2025 RZ",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-rz",
} as const satisfies CarYear
