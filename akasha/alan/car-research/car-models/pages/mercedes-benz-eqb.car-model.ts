import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzEqb = {
  id: "019e4af0-340a-7e03-a7b4-2bdfe83c5ee7",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-eqb",
  title: "EQB",
  bodyStyle: "suv",
  generation: "1st gen (X243)",
  modelYearsAvailable: "2025",
  overview:
    "The EQB is Mercedes-Benz's compact all-electric SUV, built on the GLB ICE platform shared with the gas-powered GLB-Class. Three-row 7-passenger seating standard. 70.5 kWh usable battery pack. MY2025 was the final year for the EQB in the US — Mercedes confirmed discontinuation after MY2025 with no MY2026 model planned. EQB will be succeeded by the upcoming GLB EQ on the new MMA platform (expected later in 2026). 2025 US trims: EQB 250+ (FWD, 188 hp, ~245 mi), EQB 300 4MATIC (AWD, 225 hp), EQB 350 4MATIC (AWD, 288 hp). Sources: https://www.mbusa.com/en/vehicles/class/eqb/suv ; https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/eqb/suv\n- https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
