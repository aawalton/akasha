import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiSantaFeHybrid = {
  id: "019e4ae1-d890-7e4a-bcb9-6b5272e3345c",
  pageTypeSlug: "car-model",
  slug: "hyundai-santa-fe-hybrid",
  title: "Santa Fe Hybrid",
  bodyStyle: "suv",
  generation: "5th gen (MX5) hybrid",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Santa Fe Hybrid is Hyundai's midsize three-row hybrid SUV, fully redesigned for the 2024 model year with boxy Land Rover Defender-inspired styling and standard third-row seating. Powertrain is a 1.6L turbo + electric motor + 1.49 kWh battery, total output ~231 hp / 271 lb-ft. The 2026 model year introduces a new SE entry trim ($36,150), alongside SEL, Limited, and Calligraphy. Up to 36/35 mpg city/hwy FWD. Sources: https://www.hyundaiusa.com/us/en/vehicles/santa-fe-hybrid ; https://www.kbb.com/hyundai/santa-fe-hybrid/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/santa-fe-hybrid\n- https://www.kbb.com/hyundai/santa-fe-hybrid/\n- https://cars.usnews.com/cars-trucks/hyundai/santa-fe-hybrid",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
