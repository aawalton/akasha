import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiPalisadeHybrid = {
  id: "019e4ae2-220f-7097-b8c0-5e07c5c81167",
  pageTypeSlug: "car-model",
  slug: "hyundai-palisade-hybrid",
  title: "Palisade Hybrid",
  bodyStyle: "suv",
  generation: "2nd gen (LX3) hybrid",
  modelYearsAvailable: "2026",
  overview:
    "The Palisade Hybrid is the first hybrid variant of Hyundai's flagship three-row SUV, introduced as part of the all-new 2nd-generation 2026 redesign. Powertrain is a 2.5L turbocharged inline-4 + two electric motors integrated with a 6-speed automatic, total output 329 hp. AWD standard, towing up to 4,000 lb. Three trims: SEL, Limited, Calligraphy (some sources also list SEL Premium). Arrives at US dealers fall 2025. Competes with Toyota Grand Highlander Hybrid, Kia Telluride (no hybrid), and Mazda CX-90 PHEV. Sources: https://www.hyundaiusa.com/us/en/vehicles/palisade-hybrid ; https://www.kbb.com/hyundai/palisade-hybrid/2026/specs/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/palisade-hybrid\n- https://www.hyundaiusa.com/us/en/vehicles/palisade-hybrid/compare-specs\n- https://www.kbb.com/hyundai/palisade-hybrid/2026/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
