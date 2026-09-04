import type { CarYear } from "../car-year.page-type.ts"

export const bmwXm2025 = {
  id: "019e4ae1-6390-7953-800e-f0f9d417f46a",
  pageTypeSlug: "car-year",
  slug: "bmw-xm-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 XM offered in two trims: base XM (644 hp combined, ~$159,995) and XM Label Red (738 hp, ~$186,995). 25.7 kWh battery, ~30 mi EPA EV range. iDrive 8.5 standard.\n\nSources:\n- https://www.edmunds.com/bmw/xm/\n- https://www.bmwusa.com/vehicles/m-models/xm-plug-in-hybrid/overview.html",
  shortList: false,
  sources:
    "- Edmunds 2025 XM — https://www.edmunds.com/bmw/xm/\n- BMW USA 2025 XM PHEV — https://www.bmwusa.com/vehicles/m-models/xm-plug-in-hybrid/overview.html",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-xm",
} as const satisfies CarYear
