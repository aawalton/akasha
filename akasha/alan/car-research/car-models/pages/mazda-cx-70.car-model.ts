import type { CarModel } from "../car-model.page-type.ts"

export const mazdaCx70 = {
  id: "019e4aec-ccb3-7450-b7af-cb4e91c0d317",
  pageTypeSlug: "car-model",
  slug: "mazda-cx-70",
  title: "CX-70",
  bodyStyle: "suv",
  generation: "1st gen (KL; Mazda Large Platform, longitudinal AWD)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Mazda CX-70 (non-PHEV) is the two-row, five-seat inline-6 mild-hybrid variant of Mazda's Large Platform crossover. It uses the same 3.3L turbocharged inline-6 with 48V M-Hybrid Boost as the CX-90, producing 280 hp (Turbo) or 340 hp (Turbo S). Two-row, five-passenger seating, 75.3 cu ft of max cargo, 8-speed automatic, longitudinal AWD, towing up to 5,000 lb. Positioned against the Lexus RX, Acura RDX, Genesis GV70, and Honda Passport. Assembled in Hofu, Japan. Sources: https://www.mazdausa.com/vehicles/cx-70, https://en.wikipedia.org/wiki/Mazda_CX-70",
  powertrainOptions: ["MHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- Mazda USA CX-70: https://www.mazdausa.com/vehicles/cx-70\n- Edmunds 2025: https://www.edmunds.com/mazda/cx-70/\n- J.C. Lewis Mazda trim explainer: https://www.jclewismazda.com/mazda-cx-70/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mazda",
} as const satisfies CarModel
