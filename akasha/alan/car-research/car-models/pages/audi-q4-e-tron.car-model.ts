import type { CarModel } from "../car-model.page-type.ts"

export const audiQ4ETron = {
  id: "019e4ad9-8a15-7a8b-ac1d-718f58037d1f",
  pageTypeSlug: "car-model",
  slug: "audi-q4-e-tron",
  title: "Q4 e-tron",
  bodyStyle: "suv",
  generation: "1st gen (MEB platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Q4 e-tron is Audi's entry-level all-electric compact luxury SUV, built on the VW Group MEB platform shared with VW ID.4 and Skoda Enyaq. Offered in standard SUV and Sportback (fastback-roof) body styles. Two powertrains: rear-motor Q4 45 e-tron (282 hp, 288 mi range, RWD) and dual-motor Q4 55 e-tron quattro (335 hp, 258 mi range, AWD). 82 kWh gross / 76.6 kWh net battery, up to 175 kW DC fast charging. Excluded from Audi's approved NACS adapter for Tesla Supercharger access as of MY2025/2026. Sources: https://en.wikipedia.org/wiki/Audi_Q4_e-tron ; https://www.audiusa.com/en/models/q4-e-tron/ ; https://media.audiusa.com/models/q4-e-tron",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: true,
  sources:
    "- https://www.audiusa.com/en/models/q4-e-tron/\n- https://media.audiusa.com/models/q4-e-tron\n- https://en.wikipedia.org/wiki/Audi_Q4_e-tron\n- https://cars.usnews.com/cars-trucks/audi/q4-e-tron",
  carMakeSlug: "audi",
} as const satisfies CarModel
