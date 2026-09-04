import type { CarYear } from "../car-year.page-type.ts"

export const bmw7Series2026 = {
  id: "019e4ae3-2e3f-7f12-87c8-a4073065fb72",
  pageTypeSlug: "car-year",
  slug: "bmw-7-series-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    'MY2026 750e xDrive PHEV carries over with minor pricing/equipment updates. 483 hp combined, ~34 mi EPA EV range, iDrive 8.5 + 31" Theater Screen optional.\n\nSources:\n- https://www.bmwusa.com/vehicles/7-series/sedan/plug-in-hybrid.html',
  shortList: false,
  sources:
    "- BMW USA 7 Series PHEV — https://www.bmwusa.com/vehicles/7-series/sedan/plug-in-hybrid.html",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-7-series",
} as const satisfies CarYear
