import type { CarModel } from "../car-model.page-type.ts"

export const volvoEx90 = {
  id: "019e4afc-e19e-7760-b4ba-9c52a8ee8973",
  pageTypeSlug: "car-model",
  slug: "volvo-ex90",
  title: "EX90",
  bodyStyle: "suv",
  generation: "1st gen (SPA2 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EX90 is Volvo's flagship 3-row BEV — full-size luxury SUV on the bespoke SPA2 platform, built at Volvo's Ridgeville, South Carolina plant alongside the Polestar 3 (which shares the platform). Launched late 2024 as a 2024 MY with a difficult software roll-out: many features (wireless CarPlay, full ADAS, bidirectional charging) shipped disabled and were rolled out via OTA through 2025. The 2026 refresh is the big one: switch from 400V to 800V architecture, charging peak jumps from ~250 kW to 350 kW (155 mi in 10 min claimed), new core compute, and the introduction of the 670-hp Twin Motor Performance — Volvo's most powerful production car ever. EX90 is the carrier for Volvo's interior-sensing impaired-driver detection. Sources: https://www.volvocars.com/us/cars/ex90-electric/, https://www.volvocars.com/us/media/press-releases/A2ED18400A01D55B/, https://recharged.com/articles/volvo-ex90-software-update-history",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/cars/ex90-electric/specifications/\n- https://www.volvocars.com/us/media/press-releases/A2ED18400A01D55B/\n- https://www.edmunds.com/volvo/ex90/2026/\n- https://recharged.com/articles/volvo-ex90-software-update-history",
  exclusionReason:
    "All trims excluded for kill switch (interior-sensing impairment-detection system)",
  carMakeSlug: "volvo",
} as const satisfies CarModel
