import type { CarModel } from "../car-model.page-type.ts"

export const karmaKaveya = {
  id: "019e4ae2-72df-76cb-af6c-3caba52a931b",
  pageTypeSlug: "car-model",
  slug: "karma-kaveya",
  title: "Kaveya",
  bodyStyle: "coupe",
  generation: "Kaveya platform (BEV)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Karma Kaveya is a fully-electric two-seat super-coupe and Karma's first BEV. The RWD launch trim (536 hp) reached US dealers in Q4 2025 as a 2025/2026 model; an AWD high-performance trim (~1,180 hp, 1,270 lb-ft, sub-3-second 0-60, 180 mph top speed) follows in Q4 2026. All Kaveya trims share a 120 kWh battery (mounted behind the cabin) supporting >250 mi range and 10-80% DC fast charge in ~45 min. Starting price from ~$300,000. Sources: https://carbuzz.com/cars/karma/kaveya/2026/, https://www.slashgear.com/1444933/karma-kaveya-electric-hypercar-wild-specifications-price/, https://www.captainelectro.com/cars/karmas-comeback-kid-promises-to-crash-goodwood-with-a-1000-hp-electric-supercar",
  powertrainOptions: ["BEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://carbuzz.com/cars/karma/kaveya/2026/\n- https://www.edmunds.com/karma/kaveya/\n- https://www.slashgear.com/1444933/karma-kaveya-electric-hypercar-wild-specifications-price/\n- https://www.karmaindianapolis.com/vehicle-details/2025-karma-kaveya-coupe-7350d49cb1fc5a40be6a296be09e60e3\n- https://theshopmag.com/features/full-bev-super-coupe-leads-karma-automotives-new-vehicle-portfolio/",
  exclusionReason: "All years excluded",
  carMakeSlug: "karma",
} as const satisfies CarModel
