import type { CarYear } from "../car-year.page-type.ts"

export const volvoS602025 = {
  id: "019e4aff-30e8-722e-ab20-eb78d168f5fc",
  pageTypeSlug: "car-year",
  slug: "volvo-s60-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Final US model year for the S60 — Ridgeville production ended in June 2024, sell-down through MY2025. PHEV (T8) dropped; B5 48V mild-hybrid is the only powertrain (247 hp). Trim ladder B5 Core / Plus / Ultra / Ultra Black Edition, FWD or AWD on Core and Plus, AWD only on Ultra. MSRP $42,600 (Core FWD) to $51,000 (Ultra Black Edition AWD). No 2026 successor. Sources: https://carbuzz.com/cars/volvo/s60/2025/, https://www.autoblog.com/features/2025-volvo-s60-the-last-model-year-for-the-sedan-in-the-u-s",
  shortList: false,
  sources:
    "- https://carbuzz.com/cars/volvo/s60/2025/\n- https://www.kbb.com/volvo/s60/2025/specs/\n- https://www.autoblog.com/features/2025-volvo-s60-the-last-model-year-for-the-sedan-in-the-u-s",
  exclusionReason: "All trims excluded",
  carModelSlug: "volvo-s60",
} as const satisfies CarYear
