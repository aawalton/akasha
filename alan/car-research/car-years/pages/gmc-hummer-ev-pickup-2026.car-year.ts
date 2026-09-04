import type { CarYear } from "../car-year.page-type.ts"

export const gmcHummerEvPickup2026 = {
  id: "019e4adf-8fb9-7802-bdb6-71bc10e49c60",
  pageTypeSlug: "car-year",
  slug: "gmc-hummer-ev-pickup-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "2026 Hummer EV Pickup gains native NACS port (no adapter needed for Tesla Superchargers), bi-directional charging (vehicle-to-load and vehicle-to-vehicle), and an updated Super Cruise with more advanced navigation. Pricing: 2X starts at $96,600 MSRP, 3X at $104,700 (slight reductions from 2025); Carbon Fiber Edition continues. Sources: https://www.gmc.com/electric/hummer-ev/pickup-truck ; https://www.edmunds.com/gmc/hummer-ev/ ; https://www.octanegmc.com/new-gmc-hummer-ev-pickup-truck.htm",
  shortList: false,
  sources:
    "- https://www.gmc.com/electric/hummer-ev/pickup-truck\n- https://www.edmunds.com/gmc/hummer-ev/\n- https://gmauthority.com/blog/2024/11/gm-evs-to-get-nacs-connector-starting-with-2026-model-year/",
  exclusionReason: "All trims excluded",
  carModelSlug: "gmc-hummer-ev-pickup",
} as const satisfies CarYear
