import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzAmgSl63SEPerformance = {
  id: "019e4afc-40cf-7942-8a54-dc39d2f857ec",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-amg-sl-63-s-e-performance",
  title: "AMG SL 63 S E Performance",
  bodyStyle: "convertible",
  generation: "7th gen (R232)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The AMG SL 63 S E PERFORMANCE is the plug-in hybrid variant of the R232 SL-Class roadster. Combines a handcrafted 4.0L V8 biturbo (front, 603 hp) with a rear-axle electric motor (200 hp) and a 6.1 kWh F1-derived battery (4.8 kWh usable). 805 hp / 1,047 lb-ft combined. 0-60 in 2.7 sec. Two-speed transmission on rear electric drive unit. The non-PHEV AMG SL 43, SL 55, SL 63 trims use 48V MHEV. Sources: https://www.mbusa.com/en/vehicles/model/sl/roadster/sl63er4 ; https://www.cars.com/articles/the-2026-mercedes-amg-sl63-s-e-performance-is-a-stunningly-powerful-droptop-review-518315/",
  powertrainOptions: ["PHEV", "MHEV"],
  segment: "sports",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/model/sl/roadster/sl63er4\n- https://www.cars.com/articles/the-2026-mercedes-amg-sl63-s-e-performance-is-a-stunningly-powerful-droptop-review-518315/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
