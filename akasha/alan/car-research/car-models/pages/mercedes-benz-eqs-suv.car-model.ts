import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzEqsSuv = {
  id: "019e4aef-d3fb-70e6-95b1-70bdf05d9e2d",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-eqs-suv",
  title: "EQS SUV",
  bodyStyle: "suv",
  generation: "1st gen (X296, EVA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EQS SUV is Mercedes-Benz's full-size three-row all-electric luxury SUV, sharing the EVA platform and 108 kWh usable battery pack with the EQS Sedan. Built at Mercedes' Tuscaloosa, Alabama plant, it seats up to 7 (optional third row). Trims: EQS 450+ (rear-wheel-drive, 355 hp, 305 mi range), EQS 450 4MATIC (AWD, 355 hp), EQS 580 4MATIC (AWD, 536 hp), and the Maybach EQS 680 4MATIC sub-brand variant. For MY2026 the EQS SUV gets exterior refresh, NACS-compatible adapter support, and trim packaging refinements. Sources: https://www.mbusa.com/en/vehicles/class/eqs/suv ; https://www.kbb.com/mercedes-benz/mercedes-eq-eqs-suv/",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/eqs/suv\n- https://www.kbb.com/mercedes-benz/mercedes-eq-eqs-suv/\n- https://cars.usnews.com/cars-trucks/mercedes-benz/eqs-suv",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
