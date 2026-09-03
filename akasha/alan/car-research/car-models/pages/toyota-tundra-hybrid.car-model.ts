import type { CarModel } from "../car-model.page-type.ts"

export const toyotaTundraHybrid = {
  id: "019e4b0c-9eea-76f4-b99f-55d27ed7b152",
  pageTypeSlug: "car-model",
  slug: "toyota-tundra-hybrid",
  title: "Tundra Hybrid",
  bodyStyle: "truck",
  generation: "3rd gen (XK70), launched MY2022",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Full-size pickup. The hybrid 'i-FORCE MAX' powertrain (3.4L twin-turbo V6 + 1 electric motor) is offered on select trims: Limited, Platinum, 1794, TRD Pro, Capstone. Output: 437 hp, 583 lb-ft. Up to 11,450 lb tow (Limited 4x2). i-FORCE MAX is the hybrid powertrain; the non-hybrid 3.4L twin-turbo V6 ('i-FORCE') trims are excluded from this scope. Source: https://www.toyota.com/tundrahybrid/",
  powertrainOptions: ["HEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.toyota.com/tundrahybrid/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Tundra_hybrid_4WD.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
