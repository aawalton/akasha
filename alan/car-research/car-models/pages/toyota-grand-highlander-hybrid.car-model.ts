import type { CarModel } from "../car-model.page-type.ts"

export const toyotaGrandHighlanderHybrid = {
  id: "019e4b0a-67ba-7856-a7e5-e8d8e7eb661b",
  pageTypeSlug: "car-model",
  slug: "toyota-grand-highlander-hybrid",
  title: "Grand Highlander Hybrid",
  bodyStyle: "suv",
  generation: "1st gen, launched MY2024",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Larger three-row sibling of the Highlander, offering more cargo and third-row room. Available as Grand Highlander Hybrid (2.5L+eAWD, 245 hp combined, 36 mpg combined) and Hybrid MAX (2.4L turbo HEV, 362 hp, 27 mpg combined). HEV trims: XLE, Limited, Platinum. Hybrid MAX trims: Limited, Platinum. Source: https://www.toyota.com/grandhighlanderhybrid/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.toyota.com/grandhighlanderhybrid/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Grand_Highlander_Hybrid.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
