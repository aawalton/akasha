import type { CarModel } from "../car-model.page-type.ts"

export const kiaSorentoHybrid = {
  id: "019e4aec-c261-78f3-b097-f787824ab0c1",
  pageTypeSlug: "car-model",
  slug: "kia-sorento-hybrid",
  title: "Sorento Hybrid",
  bodyStyle: "suv",
  generation: "4th gen (MQ4); 1.6T parallel hybrid; 3-row 6/7-seater",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Sorento Hybrid is Kia's three-row midsize SUV hybrid, paired with the 1.6T+electric motor + 6-speed automatic powertrain shared with the Sportage Hybrid (but bigger battery / larger body). 227 hp combined. MY2025 has two trims (EX, SX Prestige); MY2026 expands to three (EX, X-Line, SX Prestige). Source: https://www.kia.com/us/en/sorento-hybrid , https://www.kiamedia.com/us/en/media/pressreleases/23688/kia-announces-pricing-for-2026-sorento-hev",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/sorento-hybrid\nhttps://www.kia.com/us/en/sorento-hybrid/specs-compare\nhttps://www.kbb.com/kia/sorento-hybrid/\nhttps://www.kiamedia.com/us/en/media/pressreleases/23688/kia-announces-pricing-for-2026-sorento-hev",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
