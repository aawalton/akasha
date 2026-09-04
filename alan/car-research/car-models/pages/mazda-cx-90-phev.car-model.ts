import type { CarModel } from "../car-model.page-type.ts"

export const mazdaCx90Phev = {
  id: "019e4aec-681b-79f4-ada5-851c744fa4aa",
  pageTypeSlug: "car-model",
  slug: "mazda-cx-90-phev",
  title: "CX-90 PHEV",
  bodyStyle: "suv",
  generation: "1st gen (KK; Mazda Large Platform, longitudinal AWD)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Mazda CX-90 PHEV is the plug-in-hybrid variant of Mazda's flagship three-row SUV, launched alongside the inline-6 CX-90 for MY2024 on Mazda's new Large Platform. It pairs a 2.5L Skyactiv-G inline-4 with a single electric motor and a 17.8 kWh (14.8 kWh usable) lithium-ion battery, drives all four wheels through an 8-speed automatic, seats 7 (or 6 with second-row captain's chairs), and delivers 323 hp / 369 lb-ft and an EPA 26-mile all-electric range. It is the upmarket Mazda PHEV positioned against the Kia Sorento PHEV, Toyota Grand Highlander Hybrid, and the BMW X5 xDrive50e at the upper end. Assembled in Hofu, Japan. Sources: https://www.mazdausa.com/vehicles/cx-90-phev, https://en.wikipedia.org/wiki/Mazda_CX-90",
  powertrainOptions: ["PHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- Mazda USA CX-90 PHEV: https://www.mazdausa.com/vehicles/cx-90-phev\n- Mazda USA news (2026 pricing): https://news.mazdausa.com/2025-09-04-2026-Mazda-CX-90-Pricing-and-Packaging\n- Edmunds: https://www.edmunds.com/mazda/cx-90/2026/plug-in-hybrid/\n- US News: https://cars.usnews.com/cars-trucks/mazda/cx-90-phev",
  exclusionReason: "All years excluded",
  carMakeSlug: "mazda",
} as const satisfies CarModel
