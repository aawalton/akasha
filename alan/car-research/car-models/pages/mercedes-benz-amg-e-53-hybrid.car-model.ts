import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzAmgE53Hybrid = {
  id: "019e4af1-1681-798a-bb79-b5a346cd9a2e",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-amg-e-53-hybrid",
  title: "AMG E 53 Hybrid",
  bodyStyle: "sedan",
  generation: "6th gen (W214)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The AMG E 53 HYBRID is the only plug-in hybrid variant of the W214 E-Class sold in the US (the standard E 350 / E 450 are MHEV-only, no regular E 350e PHEV in US market). Combines a handcrafted AMG 3.0L turbocharged inline-6 with a 161-hp electric motor for 577 hp / 750 lb-ft combined (or 604 hp with the RACE START function). 28.3 kWh usable battery. ~50 mi all-electric range (estimated). 0-60 in ~3.7 sec. Standard 4MATIC+ AWD with a 9-speed automatic. Sources: https://www.mbusa.com/en/vehicles/class/e-class/sedan ; https://www.thecarconnection.com/cars/mercedes-benz_e-class",
  powertrainOptions: ["PHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/e-class/sedan\n- https://www.thecarconnection.com/cars/mercedes-benz_e-class\n- https://cars.usnews.com/cars-trucks/mercedes-benz/e-class",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
