import type { CarModel } from "../car-model.page-type.ts"

export const teslaModel3 = {
  id: "019e4af7-9d19-757b-a4b3-0e480f55f16c",
  pageTypeSlug: "car-model",
  slug: "tesla-model-3",
  title: "Model 3",
  bodyStyle: "sedan",
  generation: "1st gen 'Highland' refresh (2024-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tesla Model 3 is a compact electric sedan, in production since 2017, and Tesla's volume vehicle. The MY2024 'Highland' refresh brought redesigned front/rear fascias, new headlights and taillights, improved aerodynamics, quieter cabin, upgraded interior materials, ambient lighting, ventilated front seats (top trims), rear-passenger 8-inch touchscreen, and controversially removed the turn-signal stalk (replaced with steering-wheel buttons; Tesla later restored stalks across trims after sustained owner feedback). For MY2026 Tesla revamped the lineup naming: Standard/RWD ($36,990), Premium RWD/AWD ($42,490/$47,490), and Performance AWD ($54,990). All trims use Tesla's vision-only Autopilot. Sources: https://www.edmunds.com/tesla/model-3/ , https://cars.usnews.com/cars-trucks/tesla/model-3 , https://www.basenor.com/blogs/news/tesla-2026-model-3-model-y-lineup-revamped-full-pricing-what-to-do , https://en.wikipedia.org/wiki/Tesla_Model_3",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.edmunds.com/tesla/model-3/\n- https://cars.usnews.com/cars-trucks/tesla/model-3\n- https://www.basenor.com/blogs/news/tesla-2026-model-3-model-y-lineup-revamped-full-pricing-what-to-do\n- https://en.wikipedia.org/wiki/Tesla_Model_3\n- https://www.iihs.org/ratings/vehicle/tesla/model-3-4-door-sedan/2025\n- https://evchargingstations.com/chargingnews/2026-tesla-model-3-all-versions-compared/",
  exclusionReason: "Tesla / Elon Musk association — personal exclusion",
  carMakeSlug: "tesla",
} as const satisfies CarModel
