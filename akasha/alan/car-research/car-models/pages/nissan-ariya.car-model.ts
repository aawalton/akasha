import type { CarModel } from "../car-model.page-type.ts"

export const nissanAriya = {
  id: "019e4af1-ef3a-72df-882d-1d17228be21b",
  pageTypeSlug: "car-model",
  slug: "nissan-ariya",
  title: "Ariya",
  bodyStyle: "crossover",
  generation: "1st gen (FE0, CMF-EV platform)",
  modelYearsAvailable: "2025",
  overview:
    "The Nissan Ariya is a midsize battery-electric crossover SUV, the brand's first dedicated EV crossover built on the Renault-Nissan-Mitsubishi Alliance's CMF-EV platform. Launched for MY2023 in the US, it slots above the Leaf as Nissan's flagship EV. The Ariya offers single-motor FWD and dual-motor e-4ORCE AWD configurations, with 66 kWh and 91 kWh battery options. 2025 is the final US production year — Nissan pulled the Ariya from the MY2026 US lineup, though MY2025 inventory continues to be sold. Source: https://www.nissanusa.com/vehicles/electric-cars/ariya.html ; https://en.wikipedia.org/wiki/Nissan_Ariya",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: true,
  sources:
    "- Nissan USA Ariya: https://www.nissanusa.com/vehicles/electric-cars/ariya/specs-trims.html\n- Edmunds 2025 Ariya: https://www.edmunds.com/nissan/ariya/2025/trims/\n- IIHS: https://www.iihs.org/ratings/vehicle/nissan/ariya-4-door-suv/2025\n- Wikipedia: https://en.wikipedia.org/wiki/Nissan_Ariya\n- U.S. News 2025 review: https://cars.usnews.com/cars-trucks/nissan/ariya",
  carMakeSlug: "nissan",
} as const satisfies CarModel
