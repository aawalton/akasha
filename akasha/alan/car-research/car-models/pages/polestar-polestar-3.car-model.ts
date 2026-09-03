import type { CarModel } from "../car-model.page-type.ts"

export const polestarPolestar3 = {
  id: "019e4af2-d31e-7635-80a0-f7452afa1768",
  pageTypeSlug: "car-model",
  slug: "polestar-polestar-3",
  title: "Polestar 3",
  bodyStyle: "suv",
  generation: "1st gen (SPA2 platform, shared with Volvo EX90)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Polestar 3 is a battery-electric mid/full-size luxury performance SUV, the brand's first SUV. It rides on the SPA2 platform shared with the Volvo EX90, with US-bound vehicles built in Charleston, South Carolina (qualifying it for some North American sourcing considerations) alongside Chinese production. Launched for MY25 with single-motor RWD and dual-motor AWD variants (a Performance Pack adds power and chassis upgrades). For MY26, Polestar substantially refreshed the architecture: 800V electrical system, 350 kW DC fast charging (up from 250 kW), 10-80% in ~22 minutes, simplified trim names (Rear Motor / Dual Motor / Performance), bumps in power (333 / 544 / 680 hp), and an NVIDIA DRIVE AGX Orin compute upgrade for the ADAS stack. Sources: https://www.polestar.com/us/polestar-3/, https://carbuzz.com/2026-polestar-3-updates/, https://www.autoblog.com/news/2026-polestar-3-updates",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.polestar.com/us/polestar-3/\n- https://www.polestar.com/us/polestar-3/specifications/\n- https://carbuzz.com/2026-polestar-3-updates/\n- https://www.autoblog.com/news/2026-polestar-3-updates\n- https://recharged.com/articles/2025-polestar-3-reliability\n- https://www.edmunds.com/polestar/3/",
  exclusionReason: "All years excluded",
  carMakeSlug: "polestar",
} as const satisfies CarModel
