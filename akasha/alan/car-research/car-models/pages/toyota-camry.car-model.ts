import type { CarModel } from "../car-model.page-type.ts"

export const toyotaCamry = {
  id: "019e4b02-bcc7-7538-a410-1dc6654880b1",
  pageTypeSlug: "car-model",
  slug: "toyota-camry",
  title: "Camry",
  bodyStyle: "sedan",
  generation: "9th gen (XV80), launched MY2025 — hybrid-only",
  modelYearsAvailable: "2025, 2026",
  overview:
    "9th-generation Camry launched for MY2025, marking a complete shift to hybrid-only powertrain across all trims (no more V6, no more 4-cyl ICE). All Camrys now use the 5th-generation Toyota Hybrid System with 2.5L Atkinson-cycle inline-4 plus electric motors. FWD output 225 hp, AWD output 232 hp. Combined fuel economy: 51 mpg (LE FWD). The car continues to be Toyota's flagship midsize sedan and remains assembled in Georgetown, Kentucky — a key for federal IRA eligibility. Source: https://www.toyota.com/camry/ ; https://pressroom.toyota.com/2025-toyota-camry/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.toyota.com/camry/\n- https://pressroom.toyota.com/2025-toyota-camry/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Camry.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
