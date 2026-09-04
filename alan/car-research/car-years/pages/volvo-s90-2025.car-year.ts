import type { CarYear } from "../car-year.page-type.ts"

export const volvoS902025 = {
  id: "019e4aff-4665-70f7-9949-46492fd97125",
  pageTypeSlug: "car-year",
  slug: "volvo-s90-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Final US model year for the S90 — production at Daqing, China ended late 2024, sell-down through MY2025. PHEV (T8) dropped; B6 48V mild-hybrid is the only powertrain (295 hp, supercharged and turbocharged 2.0L, AWD standard). Trims: B6 Plus AWD ($58,300 MSRP) and B6 Ultra AWD ($63,900 MSRP). No 2026 successor. Sources: https://www.kbb.com/volvo/s90/2025/specs/, https://carbuzz.com/volvo-s90-sedan-final-year/",
  shortList: false,
  sources:
    "- https://www.kbb.com/volvo/s90/2025/specs/\n- https://carbuzz.com/cars/volvo/s90/2025/\n- https://carbuzz.com/volvo-s90-sedan-final-year/",
  exclusionReason: "All trims excluded",
  carModelSlug: "volvo-s90",
} as const satisfies CarYear
