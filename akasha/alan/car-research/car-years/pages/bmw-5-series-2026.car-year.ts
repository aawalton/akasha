import type { CarYear } from "../car-year.page-type.ts"

export const bmw5Series2026 = {
  id: "019e4ae2-618b-72a2-9331-5045b9a5794c",
  pageTypeSlug: "car-year",
  slug: "bmw-5-series-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 550e xDrive PHEV carries over with minor option-package shuffles and pricing adjustments. Same 483 hp / 516 lb-ft, ~33 mi EPA EV range. iDrive 8.5 standard.\n\nSources:\n- https://www.edmunds.com/bmw/5-series/2026/plug-in-hybrid/\n- https://www.kbb.com/bmw/5-series/2026/550e-xdrive/",
  shortList: false,
  sources:
    "- Edmunds 2026 5 Series PHEV — https://www.edmunds.com/bmw/5-series/2026/plug-in-hybrid/\n- KBB 2026 550e — https://www.kbb.com/bmw/5-series/2026/550e-xdrive/\n- BMW Blog 550e review — https://www.bmwblog.com/2026/02/04/2025-bmw-550e-review/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-5-series",
} as const satisfies CarYear
