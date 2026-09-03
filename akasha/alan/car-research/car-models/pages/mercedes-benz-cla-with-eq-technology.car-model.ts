import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzClaWithEqTechnology = {
  id: "019e4af0-706d-7c80-8e93-27a2ec5047cf",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-cla-with-eq-technology",
  title: "CLA with EQ Technology",
  bodyStyle: "sedan",
  generation: "C174 (MMA platform, 2nd gen as EV)",
  modelYearsAvailable: "2026",
  overview:
    "The CLA with EQ Technology is Mercedes-Benz's new compact luxury sedan launched for MY2026 on the brand-new MMA (Mercedes Modular Architecture) platform — the company's first non-EVA EV platform engineered for both fully-electric and hybrid powertrains. The BEV variant (CLA 250+ with EQ Technology) features an 800V architecture, a two-speed transmission for highway efficiency, and a 374-mile EPA-estimated range. Supports up to 320 kW DC fast charging. Native NACS charging port on EV variants (first Mercedes with factory NACS). The MMA platform also underpins an MHEV gas variant. Sources: https://www.mbusa.com/en/future-vehicles ; https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  powertrainOptions: ["BEV", "MHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/future-vehicles\n- https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/\n- https://www.topspeed.com/mercedes-benz-ambitious-lineup/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
