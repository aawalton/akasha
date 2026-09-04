import type { CarModel } from "../car-model.page-type.ts"

export const karmaGyesera = {
  id: "019e4ae2-4706-7f89-9ea4-08347cb709e0",
  pageTypeSlug: "car-model",
  slug: "karma-gyesera",
  title: "Gyesera",
  bodyStyle: "sedan",
  generation: "Gyesera platform (composite body)",
  modelYearsAvailable: "2026",
  overview:
    "The Karma Gyesera is a luxury EREV sport sedan revealed at Monterey Car Week 2024 and entering production Q4 2025 as a 2026 model. It uses the same 1.5L turbo-EREV powertrain as the 3rd-gen Revero (~566 hp / 546 lb-ft, ~80 mi EV range, ~360 mi total) but pairs it with a new design language, aluminum + carbon-reinforced composite body, and 22 inch forged wheels. Starting price ~$165,000. Sources: https://carbuzz.com/2026-karma-gyesera-price-release-date/, https://www.motor1.com/news/710942/karma-gyesera-debut-specs/, https://www.topspeed.com/karma-gyesera-erev-debut/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://carbuzz.com/2026-karma-gyesera-price-release-date/\n- https://www.motor1.com/news/710942/karma-gyesera-debut-specs/\n- https://www.topspeed.com/karma-gyesera-erev-debut/\n- https://greencarjournal.com/electric-cars/karma-gyesera-beauty-meets-efficiency/\n- https://www.netcarshow.com/karma/2026-gyesera/",
  exclusionReason: "All years excluded",
  carMakeSlug: "karma",
} as const satisfies CarModel
