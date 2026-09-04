import type { CarYear } from "../car-year.page-type.ts"

export const teslaModelY2025 = {
  id: "019e4af8-c7a8-7a20-b53e-2fbd186345be",
  pageTypeSlug: "car-year",
  slug: "tesla-model-y-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 Model Y spans the pre-Juniper-refresh trims (early MY2025 — Long Range AWD, Long Range RWD, Performance) and the post-Juniper refresh that launched mid-2025: restyled front/rear with full-width LED light bars, retuned suspension, new dashboard, ventilated front seats (Premium), 8-inch rear screen, 9 airbags. Eligible for $7,500 federal tax credit through Sep 30, 2025 (Long Range AWD, Long Range RWD, Performance trims, MSRP cap $80,000). MY2025 Tesla Model Y earned IIHS Top Safety Pick+ (5th consecutive year). Sources: https://carbuzz.com/2025-tesla-model-y-iihs-top-safety-pick-plus/ , https://www.tesla.com/IRA , https://xcarspace.com/tesla-model-y-juniper-2025-facelift-range-specs-pricing-expert-analysis/",
  shortList: false,
  sources:
    "- https://carbuzz.com/2025-tesla-model-y-iihs-top-safety-pick-plus/\n- https://www.tesla.com/IRA\n- https://xcarspace.com/tesla-model-y-juniper-2025-facelift-range-specs-pricing-expert-analysis/\n- https://www.iihs.org/ratings/vehicle/tesla/model-y-4-door-suv/2025",
  exclusionReason: "Tesla / Elon Musk association — personal exclusion",
  carModelSlug: "tesla-model-y",
} as const satisfies CarYear
