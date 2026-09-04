import type { CarModel } from "../car-model.page-type.ts"

export const toyotaCorollaHybrid = {
  id: "019e4b04-11fc-78ee-86f2-a948caae8be8",
  pageTypeSlug: "car-model",
  slug: "toyota-corolla-hybrid",
  title: "Corolla Hybrid",
  bodyStyle: "sedan",
  generation:
    "12th gen Corolla (E210), refreshed MY2023; hybrid powertrain added LE/SE/XLE/Nightshade",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Corolla Hybrid is a fuel-efficient compact sedan built on the 12th-gen Corolla (E210) platform. Available with 1.8L Atkinson-cycle hybrid system producing 138 hp combined; up to 50 mpg combined. FWD or e-AWD options. Trims include LE, SE, Nightshade, XLE. Not to be confused with the Corolla Hatchback (gas only) or GR Corolla (ICE performance). Source: https://www.toyota.com/corollahybrid/ ; https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Corolla.shtml",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.toyota.com/corollahybrid/\n- https://pressroom.toyota.com/2025-toyota-corolla-hybrid/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Corolla.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
