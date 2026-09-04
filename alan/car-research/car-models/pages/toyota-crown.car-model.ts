import type { CarModel } from "../car-model.page-type.ts"

export const toyotaCrown = {
  id: "019e4b05-39fc-7a23-bd8c-6be443843fe3",
  pageTypeSlug: "car-model",
  slug: "toyota-crown",
  title: "Crown",
  bodyStyle: "sedan",
  generation: "S235, launched MY2023",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Reintroduced flagship sedan for the US market, replacing Avalon. Hybrid-only. Two powertrains: standard 2.5L hybrid (236 hp combined, 41 mpg) and Hybrid MAX 2.4L turbo hybrid (340 hp, 30 mpg combined). Available XLE, Limited, Platinum trims. Source: https://www.toyota.com/crown/ ; https://pressroom.toyota.com/2025-toyota-crown/",
  powertrainOptions: ["HEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.toyota.com/crown/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Crown.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
