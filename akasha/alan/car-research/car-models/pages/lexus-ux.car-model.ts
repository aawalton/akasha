import type { CarModel } from "../car-model.page-type.ts"

export const lexusUx = {
  id: "019e4aec-4a86-7286-8cb7-262786e4677c",
  pageTypeSlug: "car-model",
  slug: "lexus-ux",
  title: "UX",
  bodyStyle: "crossover",
  generation: "1st gen (XA10)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus UX is a subcompact luxury crossover. For 2025, the UX is hybrid-only (UX 300h) - the gas-only UX 200 was discontinued after 2022. AWD optional. Smallest Lexus crossover. Sources: https://www.lexus.com/models/UX , https://pressroom.lexus.com/lexus-ux/",
  powertrainOptions: ["HEV"],
  segment: "luxury-compact",
  shortList: false,
  sources: "- Lexus UX\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
