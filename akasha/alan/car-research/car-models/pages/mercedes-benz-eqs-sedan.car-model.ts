import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzEqsSedan = {
  id: "019e4aef-b5ce-7915-b612-fa7e39204832",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-eqs-sedan",
  title: "EQS Sedan",
  bodyStyle: "sedan",
  generation: "1st gen (V297, EVA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EQS Sedan is Mercedes-Benz's flagship all-electric luxury sedan, positioned as the electric counterpart to the S-Class. Launched for MY2022 on the dedicated EVA (Electric Vehicle Architecture) platform with a 107.8 kWh usable battery (118 kWh gross), it offers up to 352 miles EPA range (450+ trim). The cabin centers on the optional 56-inch glass-spanning MBUX Hyperscreen. For MY2025 Mercedes added a faux radiator grille (responding to criticism of the 'jellybean' look), a 12V battery upgrade, and the AMG EQS 53 trim continues at the top. For MY2026 the EQS gets a more comprehensive refresh: revised exterior styling with three-pointed star pattern grille, range bumps, NACS-compatible adapter, and updates to interior trim. Sources: https://www.mbusa.com/en/vehicles/class/eqs/sedan ; https://www.kbb.com/mercedes-benz/mercedes-eq-eqs/",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/eqs/sedan\n- https://www.kbb.com/mercedes-benz/mercedes-eq-eqs/\n- https://cars.usnews.com/cars-trucks/mercedes-benz/eqs-sedan",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
