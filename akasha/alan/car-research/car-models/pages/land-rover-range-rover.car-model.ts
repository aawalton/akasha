import type { CarModel } from "../car-model.page-type.ts"

export const landRoverRangeRover = {
  id: "019e4ae6-fe77-77a0-8aa3-79e282c03755",
  pageTypeSlug: "car-model",
  slug: "land-rover-range-rover",
  title: "Range Rover",
  bodyStyle: "suv",
  generation: "5th gen (L460, MLA-Flex platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Range Rover is the flagship full-size luxury SUV of the JLR Land Rover brand, now in its fifth generation (L460) on the MLA-Flex (Modular Longitudinal Architecture) platform launched globally late 2021 as a 2023 MY. The L460 added an electrified 3.0L inline-6 PHEV (P460e/P550e) with a 38.2 kWh battery and ~53 mi EPA EV range, plus a 4.4L twin-turbo V8 MHEV (sourced from BMW) for SV trims. A pure BEV variant (Range Rover Electric) opened reservations in 2024 with deliveries slipping into 2026. Target buyer is the luxury full-size SUV intender cross-shopping Bentley Bentayga, Mercedes-Benz GLS, BMW X7, and Cadillac Escalade — emphasizing road refinement, long-wheelbase comfort, and a SV halo trim that competes with Bentley. Sources: https://www.rangerover.com/en-us/range-rover/index.html , https://en.wikipedia.org/wiki/Range_Rover_(L460)",
  powertrainOptions: ["PHEV", "MHEV", "ICE"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.rangerover.com/en-us/range-rover/index.html\n- https://www.edmunds.com/land-rover/range-rover/2025/plug-in-hybrid/\n- https://www.edmunds.com/land-rover/range-rover/2026/\n- https://www.landroverofrichmond.com/tools-resources/range-rover-phev-the-powerful-p550e-and-p460e-powertrains\n- https://en.wikipedia.org/wiki/Range_Rover_(L460)",
  exclusionReason: "All years excluded",
  carMakeSlug: "land-rover",
} as const satisfies CarModel
