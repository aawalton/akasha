import type { CarYear } from "../car-year.page-type.ts"

export const bmwX52026 = {
  id: "019e4adf-6e62-7342-991b-4d9e81d194ce",
  pageTypeSlug: "car-year",
  slug: "bmw-x5-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 X5 xDrive50e PHEV: MSRP $75,200 (+$1,400 vs MY2025), $1,175 destination. Same powertrain — 483 hp combined, 38 mi EPA electric range. Minor option-package shuffles. iDrive 8.5 standard.\n\nSources:\n- https://www.kbb.com/bmw/x5/2026/xdrive50e/\n- https://www.edmunds.com/bmw/x5/2026/plug-in-hybrid/",
  shortList: false,
  sources:
    "- KBB 2026 X5 50e — https://www.kbb.com/bmw/x5/2026/xdrive50e/\n- Edmunds 2026 X5 PHEV — https://www.edmunds.com/bmw/x5/2026/plug-in-hybrid/\n- BMW Blog X5 50e review — https://www.bmwblog.com/2025/12/07/bmw-x5-xdrive50e-review-range-charging-performance/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-x5",
} as const satisfies CarYear
