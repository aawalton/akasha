import type { CarModel } from "../car-model.page-type.ts"

export const mazdaCx70Phev = {
  id: "019e4aec-b00b-7da3-98eb-382ceb523b86",
  pageTypeSlug: "car-model",
  slug: "mazda-cx-70-phev",
  title: "CX-70 PHEV",
  bodyStyle: "suv",
  generation: "1st gen (KL; Mazda Large Platform, longitudinal AWD)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Mazda CX-70 PHEV is the two-row, five-seat PHEV companion to the CX-90 PHEV, launched MY2025 on the same Large Platform. Mechanically nearly identical to the CX-90 PHEV (2.5L Skyactiv-G inline-4 + electric motor, 17.8 kWh battery, 8-speed automatic, AWD, 323 hp / 369 lb-ft, EPA 26-mile EV range) but with the third row deleted in favor of more cargo space (75.3 cu ft seats down). Positioned against the Kia Sorento PHEV, Toyota RAV4 Prime, and at the higher end the Lexus NX 450h+. Assembled in Hofu, Japan. Sources: https://www.mazdausa.com/vehicles/cx-70-phev, https://en.wikipedia.org/wiki/Mazda_CX-70",
  powertrainOptions: ["PHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- Mazda USA CX-70 PHEV: https://www.mazdausa.com/vehicles/cx-70-phev\n- US News: https://cars.usnews.com/cars-trucks/mazda/cx-70-phev\n- Cars.com 2025: https://www.cars.com/research/mazda-cx_70_phev-2025/\n- North Shore Mazda FAQ: https://www.northshoremazda.net/cx-70-phev-faq/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mazda",
} as const satisfies CarModel
