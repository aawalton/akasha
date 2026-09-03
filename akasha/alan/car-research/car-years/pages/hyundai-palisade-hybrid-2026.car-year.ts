import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiPalisadeHybrid2026 = {
  id: "019e4ae3-e012-7ad0-9306-6ec8cfd21ea9",
  pageTypeSlug: "car-year",
  slug: "hyundai-palisade-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Launch year for hybrid variant of all-new 2nd-gen Palisade. 2.5L turbo + 2 e-motors, 329 hp, AWD standard, 4,000 lb tow rating. Three trims: SEL, Limited, Calligraphy. Sources: https://www.hyundaiusa.com/us/en/vehicles/palisade-hybrid",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/palisade-hybrid\n- https://www.kbb.com/hyundai/palisade-hybrid/2026/specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-palisade-hybrid",
} as const satisfies CarYear
