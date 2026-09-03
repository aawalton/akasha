import type { CarModel } from "../car-model.page-type.ts"

export const ram1500 = {
  id: "019e4af5-dd2f-7298-bbc0-f15a40dfaa63",
  pageTypeSlug: "car-model",
  slug: "ram-1500",
  title: "1500",
  bodyStyle: "truck",
  generation: "5th gen (DT, 2019-present, mid-cycle refresh 2025)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Ram 1500 is a full-size half-ton pickup truck and Ram's flagship/highest-volume model. The current 5th-generation 'DT' platform launched for MY2019; a major mid-cycle refresh arrived for the 2025 model year with revised front-end styling, an updated interior, the new 3.0L Hurricane twin-turbo inline-six engine family replacing the 5.7L HEMI V8 as the standard performance engine, and the introduction of the high-output Hurricane in the new Tungsten flagship and RHO performance trims. For 2026, the 5.7L HEMI V8 with eTorque mild-hybrid returns by popular demand alongside the Hurricane I6 lineup. All gas powertrains for 2025-2026 include 48V mild-hybrid assist: the 3.6L Pentastar V6 uses Ram's eTorque belt-starter-generator system, the Hurricane I6 (both SO/420hp and HO/540hp) integrates a 48V mild-hybrid system, and the returning 5.7L HEMI V8 uses eTorque. The 1500 competes with Ford F-150, Chevrolet Silverado 1500, GMC Sierra 1500, and Toyota Tundra. Configurations include Quad Cab and Crew Cab with 5'7\" or 6'4\" beds. Sources: https://www.ramtrucks.com/ram-1500.html , https://www.media.stellantis.com/em-en/ram/press/the-legend-returns-2026-ram-1500-offers-5-7-liter-hemi-v-8-etorque-engine-with-proven-performance-and-capability , https://blog.stellantisnorthamerica.com/2024/09/05/3-0-liter-hurricane-high-output-straight-six-turbo-engine-in-2025-ram-1500-named-to-wards-10-best-engines-propulsion-systems-list/",
  powertrainOptions: ["MHEV", "ICE"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.ramtrucks.com/ram-1500.html\n- https://www.ramtrucks.com/2025/ram-1500.html\n- https://www.edmunds.com/ram/1500/\n- https://cars.usnews.com/cars-trucks/ram/1500\n- https://en.wikipedia.org/wiki/Ram_pickup",
  exclusionReason: "All years excluded",
  carMakeSlug: "ram",
} as const satisfies CarModel
