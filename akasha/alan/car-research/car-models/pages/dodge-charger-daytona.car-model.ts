import type { CarModel } from "../car-model.page-type.ts"

export const dodgeChargerDaytona = {
  id: "019e4ad9-2b95-7a38-9c22-ad314b48b721",
  pageTypeSlug: "car-model",
  slug: "dodge-charger-daytona",
  title: "Charger Daytona",
  bodyStyle: "sedan",
  generation: "STLA-Large platform (LB body)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Dodge Charger Daytona is the brand's first all-electric muscle car, launched for MY2024 on Stellantis' STLA-Large platform with a 100.5 kWh (93.9 kWh usable) NMC battery, dual-motor AWD, and a synthesized 'Fratzonic Chambered Exhaust' to mimic V8 sound. MY2024 launched as a 2-door coupe in R/T (456-496 hp) and Scat Pack (630-670 hp) trims. MY2025 added the 4-door sedan body. For MY2026 Dodge axed the entry-level R/T after weak sales, leaving Scat Pack and a new luxury-oriented Scat Pack Plus as the only trims, available as coupe or sedan. The lineup positions the Daytona as a successor to the discontinued ICE Charger/Challenger, targeting traditional muscle-car buyers willing to accept EV powertrains. Multi-energy strategy: a gasoline 'SIXPACK' Charger variant (inline-6 twin-turbo) launched alongside for MY2026. Sources: https://www.dodge.com/charger.html ; https://www.media.stellantis.com/em-en/dodge/press/dodge-delivers-world-s-first-and-only-electric-muscle-car-announces-all-new-dodge-charger-multi-energy-lineup ; https://moparinsiders.com/2026-dodge-charger-daytona-buyers-guide-trims-pricing-specs-options-and-what-to-buy/",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.dodge.com/charger.html\n- https://www.cars.com/research/dodge-charger_daytona-2025/specs/\n- https://moparinsiders.com/2026-dodge-charger-daytona-buyers-guide-trims-pricing-specs-options-and-what-to-buy/\n- https://carbuzz.com/cars/dodge/charger-daytona/2025/specs-and-trims/\n- https://www.greencars.com/expert-insights/2026-dodge-charger-daytona-muscles-up-the-ev",
  exclusionReason: "All years excluded",
  carMakeSlug: "dodge",
} as const satisfies CarModel
