import type { CarModel } from "../car-model.page-type.ts"

export const teslaModelY = {
  id: "019e4af7-c844-709f-b3fe-5342e3171f6c",
  pageTypeSlug: "car-model",
  slug: "tesla-model-y",
  title: "Model Y",
  bodyStyle: "suv",
  generation: "1st gen 'Juniper' refresh (2025-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tesla Model Y is a compact electric crossover SUV, the best-selling EV globally and the best-selling vehicle worldwide in 2023. Mid-2025 brought the 'Juniper' refresh: restyled front/rear fascias with new headlight signature and full-width LED lightbar, revised dashboard with ambient lighting, new door panels and console, ventilated front seats (top trims), 8-inch rear passenger touchscreen, retuned suspension, additional far-side driver airbag (9 total), additional forward camera. Three trims in MY2026: Standard ($39,990 RWD / $41,990 AWD), Premium ($44,990 RWD / $48,990 AWD), Performance AWD (~$54,990, late 2025/early 2026, ~510hp, 0-60 in ~3.3s). A 3-row 'Model Y L' extended-wheelbase variant launched in China late 2025 — US availability uncertain as of May 2026. Sources: https://www.edmunds.com/tesla/model-y/ , https://cars.usnews.com/cars-trucks/tesla/model-y , https://www.basenor.com/blogs/news/tesla-2026-model-3-model-y-lineup-revamped-full-pricing-what-to-do , https://xcarspace.com/tesla-model-y-juniper-2025-facelift-range-specs-pricing-expert-analysis/ , https://en.wikipedia.org/wiki/Tesla_Model_Y",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.edmunds.com/tesla/model-y/\n- https://cars.usnews.com/cars-trucks/tesla/model-y\n- https://www.basenor.com/blogs/news/tesla-2026-model-3-model-y-lineup-revamped-full-pricing-what-to-do\n- https://xcarspace.com/tesla-model-y-juniper-2025-facelift-range-specs-pricing-expert-analysis/\n- https://en.wikipedia.org/wiki/Tesla_Model_Y\n- https://carbuzz.com/2025-tesla-model-y-iihs-top-safety-pick-plus/",
  exclusionReason: "Tesla / Elon Musk association — personal exclusion",
  carMakeSlug: "tesla",
} as const satisfies CarModel
