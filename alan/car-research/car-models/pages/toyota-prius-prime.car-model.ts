import type { CarModel } from "../car-model.page-type.ts"

export const toyotaPriusPrime = {
  id: "019e4afe-9ba8-763f-9977-d50ae0900c86",
  pageTypeSlug: "car-model",
  slug: "toyota-prius-prime",
  title: "Prius Prime",
  bodyStyle: "hatchback",
  generation: "2nd gen of Prime (5th gen Prius platform, XW60)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Plug-in hybrid sibling of the standard 5th-gen Prius, sharing the XW60 platform but adding a larger 13.6 kWh battery, AC charging only (no DC fast charge), and a more powerful 220 hp combined system. EPA all-electric range: 44-45 mi. Combined gas+electric MPGe up to 114. Available SE, XSE, and XSE Premium grades. Source: https://www.toyota.com/priusprime/ ; https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Prius_Prime.shtml",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.toyota.com/priusprime/\n- https://pressroom.toyota.com/2025-toyota-prius-prime/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Prius_Prime.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
