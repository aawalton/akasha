import type { CarModel } from "../car-model.page-type.ts"

export const mazdaCx90 = {
  id: "019e4aec-8d36-782c-97bf-a88b051cb4a1",
  pageTypeSlug: "car-model",
  slug: "mazda-cx-90",
  title: "CX-90",
  bodyStyle: "suv",
  generation: "1st gen (KK; Mazda Large Platform, longitudinal AWD)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Mazda CX-90 (non-PHEV) is the inline-6, 48-volt mild-hybrid (M-Hybrid Boost) variant of Mazda's flagship three-row SUV. It uses the e-Skyactiv G 3.3 Turbo: a 3.3L turbocharged inline-6 making 280 hp (regular fuel) or 340 hp on the Turbo S tune (premium fuel), with a small 48V starter-generator providing low-speed torque assist. Three-row seating for 6-8 depending on configuration, longitudinal-engine RWD-biased AWD, 8-speed automatic. Aimed at buyers who want a near-luxury three-row crossover (Acura MDX, Lexus TX, Genesis GV80) at Mazda price points. Assembled in Hofu, Japan. Sources: https://www.mazdausa.com/vehicles/cx-90, https://en.wikipedia.org/wiki/Mazda_CX-90",
  powertrainOptions: ["MHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- Mazda USA CX-90: https://www.mazdausa.com/vehicles/cx-90\n- Mazda USA news (2026 pricing): https://news.mazdausa.com/2025-09-04-2026-Mazda-CX-90-Pricing-and-Packaging\n- Edmunds: https://www.edmunds.com/mazda/cx-90/\n- CarGurus 2026 specs: https://www.cargurus.com/research/articles/2026-mazda-cx-90-pricing-specs-release-date",
  exclusionReason: "All years excluded",
  carMakeSlug: "mazda",
} as const satisfies CarModel
