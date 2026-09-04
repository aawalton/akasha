import type { CarModel } from "../car-model.page-type.ts"

export const gmcHummerEvSuv = {
  id: "019e4adf-2b77-71f8-8fbd-54b2f5bb85f0",
  pageTypeSlug: "car-model",
  slug: "gmc-hummer-ev-suv",
  title: "Hummer EV SUV",
  bodyStyle: "suv",
  generation: "1st gen (BT1 / Ultium platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GMC Hummer EV SUV is the shorter-wheelbase SUV variant of the Hummer EV platform, sharing 800V Ultium architecture with the pickup but on a more compact body. Targets premium-EV buyers wanting Hummer styling and off-road capability in a 5-seat SUV form factor. Lower towing/range than the pickup, slightly quicker due to lower weight. Sources: https://www.gmc.com/electric/hummer-ev/suv ; https://en.wikipedia.org/wiki/GMC_Hummer_EV ; https://www.edmunds.com/gmc/hummer-ev/",
  powertrainOptions: ["BEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.gmc.com/electric/hummer-ev/suv\n- https://en.wikipedia.org/wiki/GMC_Hummer_EV\n- https://carbuzz.com/cars/gmc/hummer-ev-suv/2026/specs-and-trims/\n- https://cars.usnews.com/cars-trucks/gmc/hummer-ev-suv",
  exclusionReason: "All years excluded",
  carMakeSlug: "gmc",
} as const satisfies CarModel
