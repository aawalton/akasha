import type { CarModel } from "../car-model.page-type.ts"

export const porschePanameraEHybrid = {
  id: "019e4afb-2cf9-7095-a82d-14a1a8b01526",
  pageTypeSlug: "car-model",
  slug: "porsche-panamera-e-hybrid",
  title: "Panamera E-Hybrid",
  bodyStyle: "sedan",
  generation: "3rd gen (G3, 2024+)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Porsche Panamera is in its third generation as of MY24, with an expanded PHEV lineup: Panamera 4 E-Hybrid ($109,950), Panamera 4S E-Hybrid ($124,950), Panamera Turbo E-Hybrid ($192,950), and Panamera Turbo S E-Hybrid ($230,950). Larger 25.9 kWh gross / 21.8 kWh usable battery (same as Cayenne PHEV refresh) gives ~32 mi EPA-rated electric-only range on lower trims. 11 kW on-board AC charger. The Panamera Executive (long-wheelbase) variant returned in the US for the Turbo S E-Hybrid. New Porsche Active Ride suspension optional (active hydraulic). Built in Leipzig, Germany. The Sport Turismo wagon variant is NO LONGER offered in the US in the 3rd-gen Panamera (US lineup is sedan + Executive only). ICE-only Panamera GTS continues alongside.\n\nSources:\n- https://www.porsche.com/usa/models/panamera/panamera-models/\n- https://newsroom.porsche.com/en_US/products/panamera/new-panamera-2023-34197.html\n- https://www.caranddriver.com/porsche/panamera\n- https://insideevs.com/news/700134/2024-porsche-panamera-revealed-specs/",
  powertrainOptions: ["PHEV", "ICE"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/panamera/panamera-e-hybrid-models/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=47350\n- https://www.caranddriver.com/porsche/panamera/specs",
  exclusionReason: "All years excluded",
  carMakeSlug: "porsche",
} as const satisfies CarModel
