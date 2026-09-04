import type { CarModel } from "../car-model.page-type.ts"

export const toyotaRav4Hybrid = {
  id: "019e4b00-24c8-78e7-8be0-a1b2e4fcd5f2",
  pageTypeSlug: "car-model",
  slug: "toyota-rav4-hybrid",
  title: "RAV4 Hybrid",
  bodyStyle: "suv",
  generation: "5th gen (XA50), launched MY2019; major refresh expected MY2026",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Best-selling SUV in the US. Hybrid variant uses 2.5L Atkinson-cycle 4-cyl + 3-motor eAWD system, 219 hp combined, 39-40 mpg combined. Note: For MY2026, Toyota announced the entire RAV4 lineup becomes electrified (HEV and PHEV only — no more ICE-only RAV4). Standard powertrain unchanged. Source: https://www.toyota.com/rav4hybrid/ ; https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4hybrid/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_RAV4_Hybrid.shtml\n- https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
