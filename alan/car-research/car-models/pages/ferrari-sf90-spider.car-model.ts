import type { CarModel } from "../car-model.page-type.ts"

export const ferrariSf90Spider = {
  id: "019e4ada-8637-79fe-9cc3-94836aeb370a",
  pageTypeSlug: "car-model",
  slug: "ferrari-sf90-spider",
  title: "SF90 Spider",
  bodyStyle: "convertible",
  generation: "F173 (SF90 family)",
  modelYearsAvailable: "2025",
  overview:
    "Open-top variant of the SF90 Stradale with a retractable hardtop — Ferrari's first PHEV offered as an open-top. Same 986 hp twin-turbo V8 + tri-motor PHEV powertrain; the RHT adds modest weight versus the coupe. MY2025 is the final production year alongside the SF90 Stradale. Sources: https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale, https://www.cars.com/research/ferrari-sf90_spider-2025/",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale\n- https://www.cars.com/research/ferrari-sf90_spider-2025/\n- https://www.jdpower.com/cars/2025/ferrari/sf90-spider",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
