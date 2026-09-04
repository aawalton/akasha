import type { CarModel } from "../car-model.page-type.ts"

export const kiaEv9 = {
  id: "019e4ae6-36c8-770e-bd97-030d468ac394",
  pageTypeSlug: "car-model",
  slug: "kia-ev9",
  title: "EV9",
  bodyStyle: "suv",
  generation: "1st gen (MV), E-GMP platform; three-row midsize SUV",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Kia's flagship three-row electric SUV, the EV9 launched as a MY2024 vehicle and is built on the same 800V E-GMP platform as the EV6 and Ioniq 5/9. It seats 6-7 depending on configuration, offers RWD or AWD, and ranges in EPA range from ~230 mi (Light RWD) to ~304 mi (Light Long Range RWD). For MY2026 Kia added a factory NACS port (Plug & Charge), introduced a Nightfall Edition appearance package on the Land AWD trim, and re-enabled $7,500 federal tax credit eligibility — MY2026 EV9s are assembled at Kia's West Point, Georgia plant. Sources: https://www.kia.com/us/en/ev9 , https://www.kiamedia.com/us/en/models/ev9/2026/pricing , https://evchargingstations.com/chargingnews/nacs-equipped-2026-kia-ev9-pricing-emerges/",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/ev9\nhttps://www.kiamedia.com/us/en/models/ev9\nhttps://cars.usnews.com/cars-trucks/kia/ev9/2025\nhttps://www.kbb.com/kia/ev9/2025/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
