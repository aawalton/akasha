import type { CarModel } from "../car-model.page-type.ts"

export const ferrariSf90Stradale = {
  id: "019e4ada-63f9-7f2e-b989-27e17af1c554",
  pageTypeSlug: "car-model",
  slug: "ferrari-sf90-stradale",
  title: "SF90 Stradale",
  bodyStyle: "coupe",
  generation: "F173 (SF90 family)",
  modelYearsAvailable: "2025",
  overview:
    "Ferrari's first series-production mid-engine PHEV supercar (introduced 2019). 4.0L twin-turbo V8 (769 hp) paired with three electric motors (two front axle, one between engine and 8-speed DCT) for 986 hp combined with AWD via electric front axle. MY2025 is final production year for the base SF90 Stradale per Ferrari's 2026 announcement; the XX variants continue and a successor is in development. Sources: https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale, https://www.ferrari.com/en-EN/auto/sf90-stradale",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.ferrari.com/en-EN/auto/sf90-stradale\n- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale\n- https://autos.yahoo.com/ferrari-sf90-stradale-production-ends-183000700.html",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
