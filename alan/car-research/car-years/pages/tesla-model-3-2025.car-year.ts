import type { CarYear } from "../car-year.page-type.ts"

export const teslaModel32025 = {
  id: "019e4af8-7ee2-74d6-9c61-02dd7068b63a",
  pageTypeSlug: "car-year",
  slug: "tesla-model-3-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 Model 3 reflects the Highland refresh that launched in Jan 2024 in the US: redesigned front (slim LED headlights, sleeker fascia) and rear (full-width LED light), improved aerodynamics, quieter cabin from added insulation and acoustic glass, upgraded interior materials, ambient light strip, ventilated front seats (Long Range), 8-inch rear passenger touchscreen, rear-wheel steering NOT included (that is S/X/Cybertruck). Three MY2025 trims: Long Range RWD ($42,490, ~363mi), Long Range AWD ($47,490, ~346mi), Performance AWD ($54,990, ~298mi after Tesla bumped it from 296mi). Tesla controversially removed the turn-signal stalk on early 2024 builds; restored mid-2024 across all trims after sustained owner pushback. MY2025 Tesla Model 3 won IIHS Top Safety Pick. Sources: https://www.edmunds.com/tesla/model-3/ , https://www.iihs.org/ratings/vehicle/tesla/model-3-4-door-sedan/2025",
  shortList: false,
  sources:
    "- https://www.edmunds.com/tesla/model-3/\n- https://www.iihs.org/ratings/vehicle/tesla/model-3-4-door-sedan/2025\n- https://www.autoevolution.com/news/2025-tesla-model-3-gets-iihs-top-safety-pick-award-over-acceptable-crash-test-rating-263090.html",
  exclusionReason: "Tesla / Elon Musk association — personal exclusion",
  carModelSlug: "tesla-model-3",
} as const satisfies CarYear
