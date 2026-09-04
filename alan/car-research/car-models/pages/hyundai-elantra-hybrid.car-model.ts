import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiElantraHybrid = {
  id: "019e4ae1-f0d3-7d8e-adc6-5d8ae3b8fbca",
  pageTypeSlug: "car-model",
  slug: "hyundai-elantra-hybrid",
  title: "Elantra Hybrid",
  bodyStyle: "sedan",
  generation: "7th gen (CN7) hybrid; 2024 facelift",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Elantra Hybrid is Hyundai's compact hybrid sedan — a value leader in fuel economy. Powertrain is a 1.6L Atkinson-cycle inline-4 + 32 kW electric motor + 1.32 kWh battery, total output 139 hp; 6-speed dual-clutch transmission. Three trims: Blue (54 mpg combined), SEL Sport, Limited. The 2026 Elantra Hybrid is essentially carryover from 2025. Competes with Honda Civic Hybrid and Toyota Corolla Hybrid. Sources: https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid ; https://www.edmunds.com/hyundai/elantra-hybrid/",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid\n- https://www.hyundaiusa.com/us/en/vehicles/elantra-hybrid/compare-specs\n- https://www.edmunds.com/hyundai/elantra-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
