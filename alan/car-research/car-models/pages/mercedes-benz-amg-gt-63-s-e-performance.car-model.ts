import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzAmgGt63SEPerformance = {
  id: "019e4af1-63c3-7105-abba-47ed18ba2a41",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-amg-gt-63-s-e-performance",
  title: "AMG GT 63 S E Performance",
  bodyStyle: "coupe",
  generation: "2nd gen (C192)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The AMG GT 63 S E PERFORMANCE is the plug-in hybrid variant of the 2nd-generation AMG GT coupe. Combines a handcrafted 4.0L V8 biturbo (front) with an AMG Electric Drive Unit and Formula 1-derived 6.1 kWh AMG High Performance Battery (rear axle) for 805 hp / 1,047 lb-ft combined. ~7 mi all-electric range; designed for performance, not efficiency. 28 mpge / 18 mpg gas-only per EPA. Available in 2-door coupe and (in the related 4-door GT family) 4-door coupe. Sources: https://www.mbusa.com/en/vehicles/model/gt/coupe/amggt63e ; https://www.kbb.com/mercedes-benz/mercedes-amg-gt/2026/gt-63-s-e-performance-hybrid-4matic_plus-4-door/",
  powertrainOptions: ["PHEV", "MHEV"],
  segment: "sports",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/model/gt/coupe/amggt63e\n- https://www.kbb.com/mercedes-benz/mercedes-amg-gt/2026/gt-63-s-e-performance-hybrid-4matic_plus-4-door/\n- https://www.edmunds.com/mercedes-benz/amg-gt/2026/amg-gt-63-s-e-performance/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
