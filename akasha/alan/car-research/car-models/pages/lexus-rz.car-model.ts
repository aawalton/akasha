import type { CarModel } from "../car-model.page-type.ts"

export const lexusRz = {
  id: "019e4ae5-f272-7d1e-8090-2a3caf29e127",
  pageTypeSlug: "car-model",
  slug: "lexus-rz",
  title: "RZ",
  bodyStyle: "suv",
  generation: "1st gen (e-TNGA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus RZ is the brand's first dedicated battery-electric vehicle, launched for the 2023 model year and built on Toyota's e-TNGA platform (shared with the bZ4X). The RZ is a luxury midsize crossover. For 2026, Lexus introduced significant updates including new trim levels (550e F SPORT Performance with higher output) and improved range. Sources: https://www.lexus.com/models/RZ , https://pressroom.lexus.com/2026-lexus-rz/ , https://insideevs.com/news/lexus-rz-2026/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- Lexus RZ: https://www.lexus.com/models/RZ\n- EPA: https://www.fueleconomy.gov/feg/bymake/Lexus2025.shtml\n- Lexus pressroom: https://pressroom.lexus.com/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
