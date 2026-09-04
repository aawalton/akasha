import type { CarYear } from "../car-year.page-type.ts"

export const ferrari296Gts2026 = {
  id: "019e4adb-405c-7baf-8127-46369ff7cc47",
  pageTypeSlug: "car-year",
  slug: "ferrari-296-gts-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover MY; arrival of the 296 Speciale A (Aperta) above it in the convertible lineup. No documented base GTS hardware refresh. Sources: https://www.classic.com/m/ferrari/296/gts/year-2026/, https://en.wikipedia.org/wiki/Ferrari_296",
  shortList: false,
  sources:
    "- https://www.classic.com/m/ferrari/296/gts/year-2026/\n- https://en.wikipedia.org/wiki/Ferrari_296",
  exclusionReason: "All trims excluded",
  carModelSlug: "ferrari-296-gts",
} as const satisfies CarYear
