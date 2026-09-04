import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiSonataHybrid = {
  id: "019e4ae2-0564-7946-b5d4-7b521df0a784",
  pageTypeSlug: "car-model",
  slug: "hyundai-sonata-hybrid",
  title: "Sonata Hybrid",
  bodyStyle: "sedan",
  generation: "8th gen (DN8) hybrid; 2024 facelift",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Sonata Hybrid is Hyundai's midsize hybrid sedan. Powertrain is a 2.0L Atkinson-cycle inline-4 + 38 kW electric motor + 1.62 kWh battery, total output 192 hp; 6-speed automatic, FWD only. Three trims: Blue (51 mpg combined), SEL, Limited. The 2026 model year is largely carryover from 2025, with Blue trim replacing SEL as the base for 2026. Sources: https://www.hyundaiusa.com/us/en/vehicles/sonata ; https://www.kbb.com/hyundai/sonata-hybrid/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/sonata\n- https://www.kbb.com/hyundai/sonata-hybrid/\n- https://cars.usnews.com/cars-trucks/hyundai/sonata-hybrid",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
