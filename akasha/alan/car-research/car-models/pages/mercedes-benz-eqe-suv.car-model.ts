import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzEqeSuv = {
  id: "019e4af0-07e1-709b-8842-7f17309a742f",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-eqe-suv",
  title: "EQE SUV",
  bodyStyle: "suv",
  generation: "1st gen (X294, EVA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EQE SUV is Mercedes-Benz's midsize all-electric luxury crossover, built on the EVA platform (shorter wheelbase than EQE Sedan), with a 90.6 kWh usable (96 kWh gross) battery. MY2025 trims: EQE 350+, EQE 350 4MATIC, EQE 500 4MATIC, AMG EQE. For MY2026 lineup simplified to EQE 320+, EQE 320 4MATIC, and AMG EQE — the EQE 500 4MATIC was dropped. Base output raised from 288 hp to 315 hp. Sources: https://www.edmunds.com/mercedes-benz/eqe-suv/ ; https://www.truecar.com/overview/mercedes-benz/eqe-suv/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.edmunds.com/mercedes-benz/eqe-suv/\n- https://www.truecar.com/overview/mercedes-benz/eqe-suv/\n- https://www.mbusa.com/en/vehicles/class/eqe/suv",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
