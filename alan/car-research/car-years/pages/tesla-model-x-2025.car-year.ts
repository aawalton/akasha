import type { CarYear } from "../car-year.page-type.ts"

export const teslaModelX2025 = {
  id: "019e4af9-2f52-7114-9249-071ee899426d",
  pageTypeSlug: "car-year",
  slug: "tesla-model-x-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 Model X continues with 2021-refresh hardware: tri-motor Plaid (1,020hp, 2.5s 0-60), dual-motor Long Range (670hp, 3.8s 0-60). Falcon-wing rear doors, 5/6/7-seat options, AMD Ryzen infotainment, optional yoke wheel. Long Range $99,990, Plaid $114,990. Eligible for $7,500 federal tax credit through Sep 30, 2025 ONLY if MSRP ≤ $80,000 — neither trim qualifies (both exceed cap). Sources: https://cars.usnews.com/cars-trucks/tesla/model-x , https://www.cars.com/research/tesla-model_x-2025/",
  shortList: false,
  sources:
    "- https://cars.usnews.com/cars-trucks/tesla/model-x\n- https://www.cars.com/research/tesla-model_x-2025/\n- https://www.kbb.com/tesla/model-x/2025/standard/",
  exclusionReason: "All trims excluded",
  carModelSlug: "tesla-model-x",
} as const satisfies CarYear
