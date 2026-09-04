import type { CarModel } from "../car-model.page-type.ts"

export const ferrariSf90XxStradale = {
  id: "019e4ada-ab60-7ca3-b161-b6106d838565",
  pageTypeSlug: "car-model",
  slug: "ferrari-sf90-xx-stradale",
  title: "SF90 XX Stradale",
  bodyStyle: "coupe",
  generation: "F173 (SF90 family) - XX derivative",
  modelYearsAvailable: "2025",
  overview:
    "Road-legal expression of Ferrari's track-only XX program; revealed June 2023, produced 2023-2025 in 799 units (allocations sold out). ICE V8 tuned to 797 hp, three e-motors add 233 hp, combined output 1,030 hp. Fixed rear wing, radical aerodynamics, hot-tube-style race exhaust. The most extreme road-legal Ferrari PHEV. Sources: https://carbuzz.com/cars/ferrari/sf90-xx-stradale/, https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://carbuzz.com/cars/ferrari/sf90-xx-stradale/\n- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale\n- https://rossoautomobili.com/blogs/ferrari-models/2023-ferrari-sf90-xx-stradale",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
