import type { CarModel } from "../car-model.page-type.ts"

export const acuraZdx = {
  id: "019e4ad5-affc-7e04-94c8-adacbaf08afa",
  pageTypeSlug: "car-model",
  slug: "acura-zdx",
  title: "ZDX",
  bodyStyle: "suv",
  generation: "1st gen (GM Ultium BEV3)",
  modelYearsAvailable: "2024, 2025",
  overview:
    "The Acura ZDX is Acura's first all-electric vehicle — a luxury midsize SUV built on GM's Ultium BEV3 platform (shared with the Honda Prologue and Cadillac LYRIQ) and assembled at GM's Spring Hill, Tennessee plant. Produced March 2024 through September 2025. Available as A-Spec (single-motor RWD, dual-motor AWD) and Type S (dual-motor performance AWD with Brembo brakes, air suspension). Production ended Sept 2025 after low sales; no 2026 model year. Replaced strategically by the in-house Honda-platform 2026 RSX. Sources: https://en.wikipedia.org/wiki/Acura_ZDX , https://www.acuraofwichita.com/the-acura-zdx-is-discontinued-what-that-means-for-drivers/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "1. https://www.acura.com/suvs/zdx/pricing-and-specs\n2. https://en.wikipedia.org/wiki/Acura_ZDX\n3. https://cars.usnews.com/cars-trucks/acura/zdx\n4. https://www.edmunds.com/acura/zdx/",
  exclusionReason: "All years excluded",
  carMakeSlug: "acura",
} as const satisfies CarModel
