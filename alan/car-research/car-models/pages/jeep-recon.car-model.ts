import type { CarModel } from "../car-model.page-type.ts"

export const jeepRecon = {
  id: "019e4ae8-22dd-7928-bc28-7e869a1d0aa7",
  pageTypeSlug: "car-model",
  slug: "jeep-recon",
  title: "Recon",
  bodyStyle: "suv",
  generation: "1st gen (STLA Large platform)",
  modelYearsAvailable: "2026",
  overview:
    "The Recon is Jeep's first all-electric off-road-rated SUV, on the STLA Large platform shared with the Wagoneer S. Dual-motor AWD, 650 hp / 620 lb-ft, 100 kWh battery, ~230-mile range in the launch Moab spec, 3.6s 0-60, 9.1 inches of ground clearance, 33-inch tires, removable doors and roof panels in true Wrangler tradition, Selec-Terrain modes, e-locker rear differential. Reveal-to-production has been delayed multiple times — originally targeted for late 2024, slipped to 2025, then to early 2026, and finally to mid-2026 with production at Toluca, Mexico. As of May 2026, the 2026 Moab Edition is the only confirmed trim. Sources: https://www.jeep.com/recon.html, https://expeditionportal.com/jeep-recon-ev-production-delayed-to-mid-2026/, https://carbuzz.com/2026-jeep-recon-specs-pricing/",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.jeep.com/recon.html\n- https://www.edmunds.com/jeep/recon/\n- https://carbuzz.com/2026-jeep-recon-specs-pricing/\n- https://www.greencars.com/expert-insights/2026-jeep-recon-review-electric-and-ready-for-the-wild\n- https://expeditionportal.com/jeep-recon-ev-production-delayed-to-mid-2026/",
  exclusionReason: "All years excluded",
  carMakeSlug: "jeep",
} as const satisfies CarModel
