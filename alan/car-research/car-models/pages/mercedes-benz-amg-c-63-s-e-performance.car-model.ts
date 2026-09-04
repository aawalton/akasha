import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzAmgC63SEPerformance = {
  id: "019e4af1-4240-72ab-8be0-bbb6ff407873",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-amg-c-63-s-e-performance",
  title: "AMG C 63 S E Performance",
  bodyStyle: "sedan",
  generation: "5th gen (W206, AMG)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The AMG C 63 S E PERFORMANCE is the only plug-in hybrid C-Class variant sold in the US (the regular C-Class is offered as C 300 MHEV only — no regular C 350e for US). Combines the world's most powerful production 2.0L turbocharged four-cylinder (469 hp on its own) with a rear-axle 201-hp electric motor and a 6.1 kWh battery for 671 hp / 752 lb-ft total. 0-60 in 3.3 sec. Designed for performance, not efficiency — minimal EV range (~7 mi). The standard C 350e PHEV is sold in Europe but not the US. Sources: https://www.mbusa.com/en/vehicles/class/c-class/sedan ; https://www.autonation.com/vehicle-research/2025-mercedes-benz-c-class-trim-levels",
  powertrainOptions: ["PHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/c-class/sedan\n- https://www.autonation.com/vehicle-research/2025-mercedes-benz-c-class-trim-levels\n- https://www.thecarconnection.com/cars/mercedes-benz_c-class",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
