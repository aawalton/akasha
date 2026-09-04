import type { CarYear } from "../car-year.page-type.ts"

export const teslaModelS2025 = {
  id: "019e4af9-020e-73fa-bd14-74d972b8bbf5",
  pageTypeSlug: "car-year",
  slug: "tesla-model-s-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 Model S continues with the 2021-refresh hardware: tri-motor Plaid (1,020hp) and dual-motor Long Range (670hp, called Long Range or Dual Motor depending on listing). Yoke steering is optional; traditional wheel standard. Adaptive air suspension, AMD Ryzen infotainment. Notable: 2025 brought slight range bumps (Long Range up to 410mi from prior 405mi). Long Range $86,630, Plaid $101,630. No federal tax credit (over $80k MSRP cap). Sources: https://cars.usnews.com/cars-trucks/tesla/model-s , https://www.edmunds.com/tesla/model-s/2025/features-specs/",
  shortList: false,
  sources:
    "- https://cars.usnews.com/cars-trucks/tesla/model-s\n- https://www.edmunds.com/tesla/model-s/2025/features-specs/\n- https://www.kbb.com/tesla/model-s/2025/specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "tesla-model-s",
} as const satisfies CarYear
