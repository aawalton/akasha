import type { CarYear } from "../car-year.page-type.ts"

export const bmwX52025 = {
  id: "019e4adf-6203-7557-9f09-632face38220",
  pageTypeSlug: "car-year",
  slug: "bmw-x5-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 X5 carries forward the post-LCI (Lifecycle Impulse) MY2024 refresh. PHEV trim is xDrive50e, with 25.7 kWh usable / 29.5 kWh gross battery, 483 hp combined, ~38 mi EPA electric range. MSRP $73,800 + $1,175 destination. Includes wireless charging, heated front seats, BMW Curved Display, iDrive 8.5.\n\nSources:\n- https://www.kbb.com/bmw/x5/2025/xdrive50e/\n- https://www.edmunds.com/bmw/x5/2025/plug-in-hybrid/",
  shortList: false,
  sources:
    "- KBB 2025 X5 50e — https://www.kbb.com/bmw/x5/2025/xdrive50e/\n- Edmunds 2025 X5 PHEV — https://www.edmunds.com/bmw/x5/2025/plug-in-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-x5",
} as const satisfies CarYear
