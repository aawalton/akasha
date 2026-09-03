import type { CarModel } from "../car-model.page-type.ts"

export const toyotaSequoia = {
  id: "019e4b0b-79a5-75d8-8e63-5d1c94a4dabb",
  pageTypeSlug: "car-model",
  slug: "toyota-sequoia",
  title: "Sequoia",
  bodyStyle: "suv",
  generation: "3rd gen (XK80), launched MY2023",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Full-size body-on-frame SUV based on Tundra. Hybrid-only powertrain: i-FORCE MAX 3.4L twin-turbo V6 HEV, 437 hp, 583 lb-ft. RWD or 4WD. Up to 9,520 lb tow rating (RWD SR5). Six trims: SR5, Limited, Platinum, TRD Pro, 1794 Edition, Capstone, plus Nightshade variants. Source: https://www.toyota.com/sequoia/",
  powertrainOptions: ["HEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.toyota.com/sequoia/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Sequoia.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
