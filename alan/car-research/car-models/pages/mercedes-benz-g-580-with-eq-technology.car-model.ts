import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzG580WithEqTechnology = {
  id: "019e4af0-940b-7129-98e3-239a47ab9775",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-g-580-with-eq-technology",
  title: "G 580 with EQ Technology",
  bodyStyle: "suv",
  generation: "W465 (5th gen G-Class platform, electrified)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The G 580 with EQ Technology is the all-electric variant of the iconic G-Class (G-Wagen). Launched for MY2025 on the W465 platform shared with the V8 G 550 and AMG G 63. Four independent electric motors (one per wheel), 116 kWh usable battery (122 kWh gross), 579 hp combined, 0-60 in 4.6 sec, with off-road features including 'G-Turn' (rotates in place), 'G-Steering' (tightens turning radius), and crawl/wading capability. 239 mi EPA-estimated range. Single trim. Sources: https://www.mbusa.com/en/vehicles/class/g-class/suv ; https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/g-class/suv\n- https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/\n- https://www.topspeed.com/mercedes-benz-ambitious-lineup/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
