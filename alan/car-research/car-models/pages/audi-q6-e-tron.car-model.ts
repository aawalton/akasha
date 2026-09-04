import type { CarModel } from "../car-model.page-type.ts"

export const audiQ6ETron = {
  id: "019e4adb-7d03-75bb-90a1-0023761c8f80",
  pageTypeSlug: "car-model",
  slug: "audi-q6-e-tron",
  title: "Q6 e-tron",
  bodyStyle: "suv",
  generation: "1st gen (PPE platform, 800V)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Q6 e-tron is Audi's new flagship midsize electric SUV, the first model built on the Premium Platform Electric (PPE) developed jointly with Porsche (also under the Macan Electric). 800V architecture enables 270 kW DC fast charging — 10-to-80% in 21 minutes — and 94.4 kWh usable battery. Offered as standard SUV and Sportback body styles. Single-motor RWD Q6 (322 hp, 321 mi EPA range) or dual-motor quattro (456 hp, 307 mi). NACS adapter included as port-installed accessory on Q6 e-tron deliveries from September 2025 onward, unlocking Tesla Supercharger access. Sits between Q4 e-tron and the now-discontinued Q8 e-tron. Sources: https://www.audiusa.com/en/models/q6-e-tron/ ; https://media.audiusa.com/models/q6-e-tron ; https://media.audiusa.com/releases/643",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.audiusa.com/en/models/q6-e-tron/\n- https://media.audiusa.com/models/q6-e-tron\n- https://media.audiusa.com/releases/643\n- https://cars.usnews.com/cars-trucks/audi/q6-e-tron",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
