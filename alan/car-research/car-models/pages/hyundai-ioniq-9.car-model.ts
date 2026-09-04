import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiIoniq9 = {
  id: "019e4ae1-4bab-730f-a06e-3b6be82dbceb",
  pageTypeSlug: "car-model",
  slug: "hyundai-ioniq-9",
  title: "Ioniq 9",
  bodyStyle: "suv",
  generation: "1st gen (ME, E-GMP platform)",
  modelYearsAvailable: "2026",
  overview:
    "The Ioniq 9 is Hyundai's first three-row electric SUV, sharing the E-GMP 800V platform with the Ioniq 5/6 and the Kia EV9. Launched for 2026 model year as a US-built (HMGMA Georgia plant) vehicle, making it eligible for the full $7,500 federal EV tax credit (until expiration Sept 30, 2025). Six trims: S RWD, SE AWD, SEL, Limited, Calligraphy, Calligraphy Design. 110.3 kWh battery, up to 335 mi RWD range, 6 or 7 passenger seating, 4,000-5,000 lb towing. Native NACS standard. Competes with Kia EV9, Rivian R1S, and the upcoming VW ID.Buzz. Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-9 ; https://cars.usnews.com/cars-trucks/hyundai/ioniq-9",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-9\n- https://www.hyundaiusa.com/us/en/vehicles/ioniq-9/compare-specs\n- https://cars.usnews.com/cars-trucks/hyundai/ioniq-9",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
