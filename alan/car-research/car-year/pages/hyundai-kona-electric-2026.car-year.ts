import type { CarYear } from "akasha/alan/car-research/car-year/car-year.page-type.types.ts"

export const hyundaiKonaElectric2026 = {
  id: "019e4ae3-1239-7178-9b37-314d52f47c5f",
  type: "page-type/car-year",
  slug: "hyundai-kona-electric-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Lineup reduced to a single SE Standard Range trim (~$32,975, 48.6 kWh, 133 hp, 200 mi range). Long-range 64.8 kWh battery and N Line/Limited trims discontinued. Sources: https://www.edmunds.com/hyundai/kona-electric/",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/kona-electric\n- https://www.edmunds.com/hyundai/kona-electric/",
  exclusionReason: "All trims excluded",
  carModel: "car-model/hyundai-kona-electric",
  createdAt: "2026-05-21T14:14:15.865Z",
  updatedAt: "2026-09-15T16:06:24.000Z",
} as const satisfies CarYear
