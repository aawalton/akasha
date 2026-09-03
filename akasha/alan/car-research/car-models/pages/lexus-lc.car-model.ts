import type { CarModel } from "../car-model.page-type.ts"

export const lexusLc = {
  id: "019e4aee-b7b1-7ea1-833f-409da15ac38c",
  pageTypeSlug: "car-model",
  slug: "lexus-lc",
  title: "LC",
  bodyStyle: "coupe",
  generation: "1st gen (Z100)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus LC is the brand's grand touring coupe (and convertible). The LC 500h is the hybrid variant with V6 + multi-stage hybrid system. Lower-volume halo car. Sources: https://www.lexus.com/models/LC , https://pressroom.lexus.com/lexus-lc/",
  powertrainOptions: ["HEV", "ICE"],
  segment: "sports",
  shortList: false,
  sources: "- Lexus LC\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
