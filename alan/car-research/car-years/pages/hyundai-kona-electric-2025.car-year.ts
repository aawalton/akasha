import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiKonaElectric2025 = {
  id: "019e4ae2-f965-7d98-a751-d7dca92d2f63",
  pageTypeSlug: "car-year",
  slug: "hyundai-kona-electric-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Second year of 2nd-gen Kona Electric. Four trims (SE, SEL, N Line, Limited), two battery options (48.6 kWh / 64.8 kWh). CCS1 port. Sources: https://www.hyundaiusa.com/us/en/vehicles/kona-electric",
  shortList: true,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/kona-electric\n- https://www.edmunds.com/hyundai/kona-electric/",
  carModelSlug: "hyundai-kona-electric",
} as const satisfies CarYear
