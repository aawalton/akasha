import type { CarModel } from "../car-model.page-type.ts"

export const lexusRx = {
  id: "019e4ae9-9d92-7e80-943e-ed4e7b50b761",
  pageTypeSlug: "car-model",
  slug: "lexus-rx",
  title: "RX",
  bodyStyle: "suv",
  generation: "5th gen (AL30)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus RX is the brand's best-selling midsize luxury crossover, redesigned for 2023. The electrified variants for 2025-2026 include the RX 350h (hybrid), RX 450h+ (PHEV), and RX 500h F SPORT Performance (high-output hybrid). Built on the TNGA-K platform. Sources: https://www.lexus.com/models/RX , https://pressroom.lexus.com/2023-lexus-rx/",
  powertrainOptions: ["HEV", "PHEV", "ICE"],
  segment: "luxury-midsize",
  shortList: false,
  sources: "- Lexus RX: https://www.lexus.com/models/RX\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
