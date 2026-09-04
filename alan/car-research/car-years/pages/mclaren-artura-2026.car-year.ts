import type { CarYear } from "../car-year.page-type.ts"

export const mclarenArtura2026 = {
  id: "019e4aec-ba12-7ef5-85b7-db7ea9c56744",
  pageTypeSlug: "car-year",
  slug: "mclaren-artura-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover model year following the comprehensive 2025 mid-cycle refresh. Pricing increased modestly: 2026 Artura coupe starts at $260,400, Spider starts at $285,700. Standard equipment now includes the Smartphone Integration Package (Apple CarPlay) with 10.25-inch driver display and 8-inch HD center screen. Revised exhaust system tuning. No mechanical changes versus 2025. Source: https://www.mclarenhouston.com/2026-mclaren-artura ; https://www.kbb.com/mclaren/artura/",
  shortList: false,
  sources:
    "- https://www.mclarenhouston.com/2026-mclaren-artura\n- https://www.kbb.com/mclaren/artura/\n- https://www.truecar.com/overview/mclaren/artura/\n- https://www.mclarenranchomirage.com/2026-mclaren-artura",
  exclusionReason: "All trims excluded",
  carModelSlug: "mclaren-artura",
} as const satisfies CarYear
