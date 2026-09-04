import type { CarModel } from "../car-model.page-type.ts"

export const audiS6SportbackETron = {
  id: "019e4ae1-3157-7a6f-bfe8-a5d3fec081d3",
  pageTypeSlug: "car-model",
  slug: "audi-s6-sportback-e-tron",
  title: "S6 Sportback e-tron",
  bodyStyle: "hatchback",
  generation: "1st gen (PPE platform, 800V)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The S6 Sportback e-tron is the performance variant of the A6 e-tron Sportback. Dual-motor quattro AWD, 543 hp, 0-60 in 3.7s, 324 mi EPA range on 20-inch wheels. Same 800V PPE platform, 94.4 kWh usable battery, 270 kW DC fast charging. NACS adapter included as port-installed accessory from Sept 2025. Sources: https://media.audiusa.com/models/s6-sportback-e-tron ; https://insideevs.com/news/753393/2025-audi-a6-etron-us-price-range-specs/ ; https://media.audiusa.com/releases/643",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://media.audiusa.com/models/s6-sportback-e-tron\n- https://insideevs.com/news/753393/2025-audi-a6-etron-us-price-range-specs/\n- https://media.audiusa.com/releases/643",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
