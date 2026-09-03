import type { CarModel } from "../car-model.page-type.ts"

export const lexusEs = {
  id: "019e4aeb-0a0e-7bc5-9243-a7a3f92e0468",
  pageTypeSlug: "car-model",
  slug: "lexus-es",
  title: "ES",
  bodyStyle: "sedan",
  generation: "7th gen (XZ10)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus ES is a midsize luxury sedan. The ES 300h is the hybrid variant, sharing the Toyota TNGA-K platform with the Camry/Avalon. For 2026, Lexus introduced the all-new 8th-generation ES which adds BEV variants. The 7th-gen 2025 model continues with proven hybrid system. Sources: https://www.lexus.com/models/ES , https://pressroom.lexus.com/all-new-2026-lexus-es/",
  powertrainOptions: ["HEV", "ICE"],
  segment: "luxury-midsize",
  shortList: false,
  sources: "- Lexus ES: https://www.lexus.com/models/ES\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
