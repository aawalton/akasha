import type { CarModel } from "../car-model.page-type.ts"

export const jeepGrandCherokee4xe = {
  id: "019e4ae6-2b29-709c-936e-93dc91188239",
  pageTypeSlug: "car-model",
  slug: "jeep-grand-cherokee-4xe",
  title: "Grand Cherokee 4xe",
  bodyStyle: "suv",
  generation: "WL (5th gen, 2022-present; 4xe added 2022)",
  modelYearsAvailable: "2025",
  overview:
    "The Grand Cherokee 4xe is the plug-in-hybrid Grand Cherokee, sharing the WL-platform 4xe powertrain (2.0L turbo + dual electric motors + 17.3 kWh battery, 375 hp / 470 lb-ft, 8-spd auto, 4WD). Launched as a MY2022; available in Limited, Trailhawk, Overland, Summit, and Summit Reserve trims through MY2025. Like the Wrangler 4xe, the program is terminated for MY2026 under the January 2026 Stellantis PHEV cancellation — 2025 is the last year the Grand Cherokee 4xe is sold new in the US. Replacement REEV is expected to share the Grand Wagoneer 4xe range-extender architecture (no firm timeline). Sources: https://www.jeep.com/grand-cherokee-4xe.html, https://electrek.co/2026/01/09/jeep-wrangler-4xe-dead-all-stellantis-phevs/, https://moparinsiders.com/stellantis-confirms-jeep-4xe-phev-program-is-finished/",
  powertrainOptions: ["PHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.jeep.com/grand-cherokee-4xe.html\n- https://cars.usnews.com/cars-trucks/jeep/grand-cherokee-4xe\n- https://www.edmunds.com/jeep/grand-cherokee-4xe/\n- https://www.cars.com/research/jeep-grand_cherokee_4xe-2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "jeep",
} as const satisfies CarModel
