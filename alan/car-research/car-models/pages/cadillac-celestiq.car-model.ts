import type { CarModel } from "../car-model.page-type.ts"

export const cadillacCelestiq = {
  id: "019e4ad7-4677-7095-a96c-f5e96e07b352",
  pageTypeSlug: "car-model",
  slug: "cadillac-celestiq",
  title: "Celestiq",
  bodyStyle: "sedan",
  generation: "1st gen (bespoke platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Celestiq is Cadillac's ultra-luxury, hand-built, made-to-order all-electric grand-touring sedan, launched in mid-2025. Each car is bespoke — buyers customize materials, colors, and finishes through Cadillac concierge service. 111-kWh battery, dual motors producing 655 hp and 646 lb-ft, AWD standard, 3.7 second 0-60, 303-mile EPA range. Features a 55-inch dash-spanning display, 38-speaker AKG audio, electrochromic glass roof with individual zone control. Production is extremely limited. Pricing started at $340,000 for 2025 and rose to the low-$400,000 range for 2026. Sources: [US News 2026 Celestiq](https://cars.usnews.com/cars-trucks/cadillac/celestiq), [Wikipedia Celestiq](https://en.wikipedia.org/wiki/Cadillac_Celestiq), [HotCars 2026 Celestiq pricing](https://www.hotcars.com/2026-cadillac-celestiq-pricing/).",
  powertrainOptions: ["BEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- [US News 2026 Celestiq](https://cars.usnews.com/cars-trucks/cadillac/celestiq)\n- [Wikipedia Celestiq](https://en.wikipedia.org/wiki/Cadillac_Celestiq)\n- [HotCars 2026 Celestiq pricing](https://www.hotcars.com/2026-cadillac-celestiq-pricing/)\n- [KBB Celestiq](https://www.kbb.com/cadillac/celestiq/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
