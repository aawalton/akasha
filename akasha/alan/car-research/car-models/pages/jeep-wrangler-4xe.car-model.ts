import type { CarModel } from "../car-model.page-type.ts"

export const jeepWrangler4xe = {
  id: "019e4ae4-0476-74b6-ae76-d0c3dbb8616b",
  pageTypeSlug: "car-model",
  slug: "jeep-wrangler-4xe",
  title: "Wrangler 4xe",
  bodyStyle: "suv",
  generation: "JL (4th gen, 2018-present; 4xe added 2021)",
  modelYearsAvailable: "2025",
  overview:
    "The Wrangler 4xe is the plug-in-hybrid variant of the JL Wrangler, launched in MY2021 as Jeep's volume PHEV. It pairs the 2.0L turbo I4 ('Hurricane 4') with two electric motors and a 17.3 kWh battery, sending 375 hp / 470 lb-ft through an eight-speed automatic to a Selec-Trac or Rock-Trac transfer case. Stellantis announced in January 2026 that the 4xe program (Wrangler and Grand Cherokee) is terminated effective with MY2026 — the 2025 model is the final Wrangler 4xe sold new in the US, and remaining 2025 inventory remains on dealer lots through 2026 under a Stellantis $7,500 manufacturer rebate. The replacement is a planned Wrangler REEV using the new Grand Wagoneer 4xe range-extender architecture, no timeline yet. Sources: https://www.jeep.com/wrangler-4xe.html, https://electrek.co/2026/01/09/jeep-wrangler-4xe-dead-all-stellantis-phevs/, https://moparinsiders.com/stellantis-confirms-jeep-4xe-phev-program-is-finished/",
  powertrainOptions: ["PHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.jeep.com/wrangler-4xe.html\n- https://www.edmunds.com/jeep/wrangler-4xe/\n- https://cars.usnews.com/cars-trucks/jeep/wrangler-4xe\n- https://electrek.co/2026/01/09/jeep-wrangler-4xe-dead-all-stellantis-phevs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "jeep",
} as const satisfies CarModel
