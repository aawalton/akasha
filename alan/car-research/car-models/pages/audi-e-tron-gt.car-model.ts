import type { CarModel } from "../car-model.page-type.ts"

export const audiETronGt = {
  id: "019e4ae3-9319-72e1-8efe-4c5f87431762",
  pageTypeSlug: "car-model",
  slug: "audi-e-tron-gt",
  title: "e-tron GT",
  bodyStyle: "sedan",
  generation: "1st gen facelift (J1 platform, 800V)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The e-tron GT is Audi's flagship electric four-door grand-tourer, sharing the 800V J1 platform with the Porsche Taycan. MY2025 brought a mid-cycle product improvement with revised exterior, upgraded battery (97 kWh net), faster charging, new motors, and a new trim hierarchy: the entry S e-tron GT (670 hp) replaced the prior base car, and the RS e-tron GT performance (912 hp with launch control / 818 hp without) became the new range-topper. NACS adapter included as port-installed accessory from Sept 2025. Sources: https://media.audiusa.com/models/e-tron-gt-rs-e-tron-gt ; https://cars.usnews.com/cars-trucks/audi/e-tron-gt ; https://media.audiusa.com/releases/643",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.audiusa.com/en/models/e-tron-gt/\n- https://media.audiusa.com/models/e-tron-gt-rs-e-tron-gt\n- https://cars.usnews.com/cars-trucks/audi/e-tron-gt\n- https://media.audiusa.com/releases/643",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
