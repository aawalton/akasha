import type { CarYear } from "../car-year.page-type.ts"

export const bmwXm2026 = {
  id: "019e4ae1-79b8-7804-9868-926c0e15fc98",
  pageTypeSlug: "car-year",
  slug: "bmw-xm-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 XM consolidated to a single XM Label trim at $159,600 (down from $187k Label Red of MY2025). Power 738 hp / 738 lb-ft. New 11 kW on-board charger (up from 7.4 kW). 30 mi EPA-rated EV range. New interior options and BMW Individual paint colors.\n\nSources:\n- https://www.bmwblog.com/2026/01/14/2026-bmw-xm-price-cut-charging-updates/\n- https://www.edmunds.com/bmw/xm-label/",
  shortList: false,
  sources:
    "- BMW Blog 2026 XM update — https://www.bmwblog.com/2026/01/14/2026-bmw-xm-price-cut-charging-updates/\n- Edmunds 2026 XM Label — https://www.edmunds.com/bmw/xm-label/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-xm",
} as const satisfies CarYear
