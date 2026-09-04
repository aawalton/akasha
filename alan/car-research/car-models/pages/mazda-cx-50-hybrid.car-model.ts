import type { CarModel } from "../car-model.page-type.ts"

export const mazdaCx50Hybrid = {
  id: "019e4aec-f344-7dd5-8272-cc710f40da70",
  pageTypeSlug: "car-model",
  slug: "mazda-cx-50-hybrid",
  title: "CX-50 Hybrid",
  bodyStyle: "suv",
  generation: "1st gen (KF; Mazda Small Platform, transverse-engine AWD)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Mazda CX-50 Hybrid is the hybrid variant of Mazda's outdoor-focused compact crossover, launched for MY2025. Notably, the hybrid powertrain is Toyota-sourced (2.5L inline-4 + three motors + NiMH battery + eCVT — the same Toyota Hybrid System used in the RAV4 Hybrid), reflecting the Mazda-Toyota partnership that also produced the Huntsville, Alabama assembly plant (Mazda Toyota Manufacturing USA) where the CX-50 is built. Combined output is 219 hp, AWD is standard via a rear electric motor, EPA combined is 38 mpg. Positioned against the Toyota RAV4 Hybrid, Honda CR-V Hybrid, Hyundai Tucson Hybrid, and Kia Sportage Hybrid. Sources: https://www.mazdausa.com/vehicles/cx-50-hybrid, https://en.wikipedia.org/wiki/Mazda_CX-50, https://www.greencarreports.com/news/1144995_2025-mazda-cx-50-hybrid-test-drive-review",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- Mazda USA CX-50 Hybrid: https://www.mazdausa.com/vehicles/cx-50-hybrid\n- Mazda USA news (2026 pricing): https://news.mazdausa.com/2025-09-16-2026-Mazda-CX-50-Pricing-and-Packaging\n- Edmunds 2026 Hybrid: https://www.edmunds.com/mazda/cx-50/2026/hybrid/\n- Green Car Reports drive review: https://www.greencarreports.com/news/1144995_2025-mazda-cx-50-hybrid-test-drive-review",
  exclusionReason: "All years excluded",
  carMakeSlug: "mazda",
} as const satisfies CarModel
