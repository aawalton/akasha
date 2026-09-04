import type { CarModel } from "../car-model.page-type.ts"

export const audiA6SportbackETron = {
  id: "019e4adf-6145-708d-891f-aba6489581d2",
  pageTypeSlug: "car-model",
  slug: "audi-a6-sportback-e-tron",
  title: "A6 Sportback e-tron",
  bodyStyle: "hatchback",
  generation: "1st gen (PPE platform, 800V)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The A6 Sportback e-tron is Audi's midsize electric sedan/liftback — sold in the US only in five-door fastback (Sportback) form, not as a traditional notchback. Built on the same 800V PPE platform as the Q6 e-tron and Porsche Macan Electric. Single-motor RWD (375 hp, up to 392 mi EPA range) or quattro AWD (456 hp, ~377 mi). 94.4 kWh usable battery, 270 kW DC fast charging (~21 min 10-to-80%). Highest-range Audi BEV sold in the US. NACS adapter included as port-installed accessory from Sept 2025. Sources: https://www.audiusa.com/en/models/a6-e-tron/a6-sportback-e-tron/2025/overview/ ; https://insideevs.com/news/753393/2025-audi-a6-etron-us-price-range-specs/ ; https://media.audiusa.com/releases/643",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.audiusa.com/en/models/a6-e-tron/a6-sportback-e-tron/2025/overview/\n- https://insideevs.com/news/753393/2025-audi-a6-etron-us-price-range-specs/\n- https://media.audiusa.com/models/a6-sportback-e-tron\n- https://media.audiusa.com/releases/643",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
