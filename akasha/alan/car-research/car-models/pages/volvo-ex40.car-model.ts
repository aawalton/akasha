import type { CarModel } from "../car-model.page-type.ts"

export const volvoEx40 = {
  id: "019e4afc-a2e1-76f4-b606-ab0bc8eeb1e7",
  pageTypeSlug: "car-model",
  slug: "volvo-ex40",
  title: "EX40",
  bodyStyle: "suv",
  generation: "1st gen (CMA platform, renamed from XC40 Recharge in MY2025)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EX40 is Volvo's compact BEV — formerly sold as the XC40 Recharge (2021–2024), renamed for MY2025 as part of Volvo's BEV-naming refresh (EX = electric XC; EC = electric C). Same CMA platform as the gas XC40. Built in Ghent, Belgium. Single Motor Extended Range (RWD, 248 hp, ~296 mi EPA) or Twin Motor (AWD, 402 hp, ~254 mi). MY2026 carries forward with the new NACS-native port and Volvo Car UX. Sources: https://www.volvocars.com/us/cars/ex40-electric/, https://www.cars.com/research/volvo-ex40-2025/, https://www.kbb.com/volvo/ex40/2025/specs/",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/cars/ex40-electric/\n- https://www.kbb.com/volvo/ex40/2025/specs/\n- https://www.edmunds.com/volvo/xc40/2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
