import type { CarModel } from "../car-model.page-type.ts"

export const kiaNiroEv = {
  id: "019e4ae8-1b8f-765e-b9e3-ded4b03027ff",
  pageTypeSlug: "car-model",
  slug: "kia-niro-ev",
  title: "Niro EV",
  bodyStyle: "crossover",
  generation: "2nd gen (SG2), shared platform with Niro Hybrid/PHEV; not E-GMP — 400V architecture",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Niro EV is Kia's smaller entry-level battery-electric crossover, sharing a body with the Niro Hybrid and PHEV. Unlike the EV6/EV9, the Niro EV uses a 400V (not 800V) architecture, so DC fast charging tops out around 85 kW peak. Two trims (Wind, Wave) carry forward into MY2025 and MY2026 with a 64.8 kWh battery, 201 hp single front-motor FWD, and 253 mi EPA range. Niro EV ships with a CCS1 port but is included in the Kia NACS adapter program ($249 at dealers; bundled free with newer EV6/EV9). Sources: https://www.kia.com/us/en/niro-ev , https://www.kiamedia.com/us/en/models/niro-ev/2025/pricing , https://insideevs.com/news/768225/kia-ev6-charging-adapter-tesla/",
  powertrainOptions: ["BEV"],
  segment: "subcompact",
  shortList: true,
  sources:
    "https://www.kia.com/us/en/niro-ev\nhttps://www.kiamedia.com/us/en/models/niro-ev/2025/pricing\nhttps://cars.usnews.com/cars-trucks/kia/niro-ev\nhttps://www.edmunds.com/kia/niro-ev/2025/",
  carMakeSlug: "kia",
} as const satisfies CarModel
