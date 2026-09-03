import type { CarModel } from "../car-model.page-type.ts"

export const landRoverRangeRoverSport = {
  id: "019e4ae7-3199-7eaf-8782-2e0555abff23",
  pageTypeSlug: "car-model",
  slug: "land-rover-range-rover-sport",
  title: "Range Rover Sport",
  bodyStyle: "suv",
  generation: "3rd gen (L461, MLA-Flex platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Range Rover Sport is the dynamic-focused mid-size sibling to the flagship Range Rover, sharing the MLA-Flex (L461) architecture introduced as a 2023 MY. US lineup centers on the 3.0L inline-6 P360 / P400 MHEV, the P460e / P550e PHEV (38.2 kWh battery, ~53 mi EPA EV range), and the 4.4L twin-turbo V8 (BMW-sourced) in P530 and SV trims. The Range Rover Sport SV introduced in 2024 made the V8 the performance halo (626 hp, 0–60 in ~3.6s) with optional 23-inch carbon wheels and Brembo carbon-ceramic brakes. Target buyer cross-shops Porsche Cayenne, BMW X5/X6 M, Mercedes-Benz GLE 63 — emphasizing sportier dynamics than the standard Range Rover while keeping the brand's off-road pedigree. Sources: https://www.landroverusa.com/range-rover/range-rover-sport/index.html , https://www.edmunds.com/land-rover/range-rover-sport/2026/plug-in-hybrid/",
  powertrainOptions: ["PHEV", "MHEV", "ICE"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.landroverusa.com/range-rover/range-rover-sport/index.html\n- https://www.edmunds.com/land-rover/range-rover-sport/2025/plug-in-hybrid/\n- https://www.edmunds.com/land-rover/range-rover-sport/2026/plug-in-hybrid/\n- https://www.cars.com/research/land_rover-range_rover_sport-2026/\n- https://www.kbb.com/land-rover/range-rover-sport/2026/autobiography-p550e/",
  exclusionReason: "All years excluded",
  carMakeSlug: "land-rover",
} as const satisfies CarModel
