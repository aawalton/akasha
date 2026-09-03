import type { CarModel } from "../car-model.page-type.ts"

export const kiaEv6 = {
  id: "019e4ae3-6684-79dc-b292-d7389047144c",
  pageTypeSlug: "car-model",
  slug: "kia-ev6",
  title: "EV6",
  bodyStyle: "crossover",
  generation:
    "1st gen (CV), E-GMP platform; mid-cycle refresh for MY2025 with revised front fascia, longer body, larger battery options, NACS port",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EV6 is Kia's compact electric crossover built on the Hyundai Motor Group's 800V E-GMP platform (shared with Ioniq 5, Genesis GV60). It launched as a MY2022 model. For MY2025 Kia delivered a significant mid-cycle refresh: revised front and rear styling, a 84 kWh long-range battery (up from 77.4 kWh), longer wheelbase / overall length, new panoramic dual-display dashboard, updated steering wheel, V2L (vehicle-to-load), and — uniquely among Kias — a factory NACS port supporting native Tesla Supercharger access via Plug & Charge. MY2026 carries the refresh forward with three trim families (Light, Wind, GT-Line) and ~$5,000 across-the-board MSRP cuts. The GT performance variant (601 hp, 0-60 in 3.4 s) is in the MY2025 lineup. Sources: https://www.kia.com/us/en/ev6 , https://evchargingstations.com/chargingnews/2026-kia-ev6-lower-msrp/ , https://insideevs.com/news/768225/kia-ev6-charging-adapter-tesla/",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/ev6\nhttps://www.kiamedia.com/us/en/models/ev6\nhttps://www.kia.com/us/en/ev6/specs-compare\nhttps://cars.usnews.com/cars-trucks/kia/ev6\nhttps://www.kiamedia.com/us/en/media/pressreleases/23210/kia-ev6-ev9-and-niro-owners-gain-access-to-over-21500-tesla-superchargers",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
