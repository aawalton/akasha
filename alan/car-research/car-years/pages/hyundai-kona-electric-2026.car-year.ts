import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiKonaElectric2026 = {
  id: "019e4ae3-1239-7178-9b37-314d52f47c5f",
  pageTypeSlug: "car-year",
  slug: "hyundai-kona-electric-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Lineup reduced to a single SE Standard Range trim (~$32,975, 48.6 kWh, 133 hp, 200 mi range). Long-range 64.8 kWh battery and N Line/Limited trims discontinued. Sources: https://www.edmunds.com/hyundai/kona-electric/",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/kona-electric\n- https://www.edmunds.com/hyundai/kona-electric/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-kona-electric",
} as const satisfies CarYear
