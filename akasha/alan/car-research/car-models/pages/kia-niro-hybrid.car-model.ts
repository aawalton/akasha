import type { CarModel } from "../car-model.page-type.ts"

export const kiaNiroHybrid = {
  id: "019e4ae8-ef9a-7514-9984-6f48cf60aaef",
  pageTypeSlug: "car-model",
  slug: "kia-niro-hybrid",
  title: "Niro Hybrid",
  bodyStyle: "crossover",
  generation:
    "2nd gen (SG2); shared with Niro EV / PHEV; 1.6L Atkinson + 6-speed DCT hybrid powertrain",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Niro Hybrid is Kia's subcompact dedicated-hybrid crossover, sharing its body with the Niro EV and PHEV but using a 1.6L Atkinson-cycle gas engine paired with a single permanent-magnet motor in a 6-speed dual-clutch transmission. Output is 139 hp / 195 lb-ft combined. The LX trim returns up to 53 mpg combined; higher trims (EX / SX / SX Touring) settle at ~49 mpg due to larger wheels. Five trims for MY2025 (LX, EX, EX Touring, SX, SX Touring); MY2026 drops EX Touring, leaving four (LX, EX, SX, SX Touring). Source: https://www.kia.com/us/en/niro , https://www.autoblog.com/news/kias-new-2026-niro-hev-price-tag-could-shake-up-the-hybrid-market",
  powertrainOptions: ["HEV"],
  segment: "subcompact",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/niro\nhttps://www.kia.com/us/en/niro/specs-compare\nhttps://www.kbb.com/kia/niro-plug-in-hybrid/2025/specs/\nhttps://www.edmunds.com/kia/niro/2025/trims/",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
