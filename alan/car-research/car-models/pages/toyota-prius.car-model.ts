import type { CarModel } from "../car-model.page-type.ts"

export const toyotaPrius = {
  id: "019e4afb-ee2c-7949-847e-c38d1e348acb",
  pageTypeSlug: "car-model",
  slug: "toyota-prius",
  title: "Prius",
  bodyStyle: "hatchback",
  generation: "5th gen (XW60), launched MY2023",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Toyota Prius is the original mass-market hybrid (launched 1997 in Japan, MY2001 in US). The 5th-generation XW60, launched MY2023, dramatically redesigned the Prius with sleeker styling and a more powerful 2.0L Atkinson-cycle 4-cylinder hybrid powertrain producing 196 hp (FWD) / 196 hp combined for AWD. Fuel economy is up to 57 mpg combined. The Prius and Prius Prime (PHEV) share most bodywork; the standard Prius is HEV-only. Available in LE, XLE, Limited grades, with FWD or e-AWD (rear electric motor). Source: https://www.toyota.com/prius/ ; https://www.caranddriver.com/toyota/prius",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.toyota.com/prius/\n- https://pressroom.toyota.com/2025-toyota-prius/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Prius.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
