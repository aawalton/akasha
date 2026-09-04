import type { CarModel } from "../car-model.page-type.ts"

export const toyotaHighlanderHybrid = {
  id: "019e4b09-178a-7d8d-8cdd-6ff927a657dc",
  pageTypeSlug: "car-model",
  slug: "toyota-highlander-hybrid",
  title: "Highlander Hybrid",
  bodyStyle: "suv",
  generation: "4th gen (XU70)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Three-row midsize SUV. Hybrid uses 2.5L+eAWD HEV system (or FWD), 243 hp combined, 35-36 mpg combined. Five trims: LE, XLE, Bronze Edition, Limited, Platinum (plus Nightshade variants on XLE). Source: https://www.toyota.com/highlanderhybrid/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.toyota.com/highlanderhybrid/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Highlander_Hybrid.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
