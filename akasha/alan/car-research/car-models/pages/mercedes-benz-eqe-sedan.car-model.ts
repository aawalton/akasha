import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzEqeSedan = {
  id: "019e4aef-efa0-7c59-a402-5a95cb38e8a9",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-eqe-sedan",
  title: "EQE Sedan",
  bodyStyle: "sedan",
  generation: "1st gen (V295, EVA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EQE Sedan is Mercedes-Benz's midsize all-electric luxury sedan, the electric counterpart to the E-Class. Built on the EVA platform with a 90.6 kWh usable (96 kWh gross) battery pack. MY2025 trims: EQE 350+ (RWD, 288 hp, 308 mi range), EQE 350 4MATIC (AWD), EQE 500 4MATIC (AWD, 402 hp), AMG EQE (617 hp / 677 with Dynamic Plus). MY2026 update: base 350+ output increased to 315 hp (renamed 'EQE 320' family on some markets per Mercedes refresh nomenclature), exterior front-end refresh with star pattern grille, and NACS-compatible DC adapter included. Sources: https://www.edmunds.com/mercedes-benz/eqe/ ; https://cars.usnews.com/cars-trucks/mercedes-benz/eqe-sedan",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.edmunds.com/mercedes-benz/eqe/\n- https://cars.usnews.com/cars-trucks/mercedes-benz/eqe-sedan\n- https://www.kbb.com/mercedes-benz/mercedes-amg-eqe/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
