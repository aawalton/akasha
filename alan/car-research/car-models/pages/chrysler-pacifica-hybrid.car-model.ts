import type { CarModel } from "../car-model.page-type.ts"

export const chryslerPacificaHybrid = {
  id: "019e4ad6-a1d2-75ec-94ab-80cb1ad86583",
  pageTypeSlug: "car-model",
  slug: "chrysler-pacifica-hybrid",
  title: "Pacifica Hybrid",
  bodyStyle: "minivan",
  generation: "2nd gen (RU, 2017-present)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Chrysler Pacifica Hybrid is a plug-in hybrid minivan, the only PHEV minivan sold new in the US. It pairs a 3.6L Pentastar V6 (Atkinson-cycle, detuned) with an electric variable transmission containing two electric motors and a 16 kWh lithium-ion battery, producing 260 hp combined. EPA-rated for 32 miles of all-electric range, 82 MPGe (electric+gas), 30 mpg (gas-only mode), and ~520 miles total range. Seats 7 standard (some trims 8) with Stow 'n Go-style second-row captain's chairs (note: hybrid does not stow the second-row seats into the floor — that space holds the battery). Launched as 2017 model; current 2nd-generation (RU platform) has been on sale since 2017 with cosmetic refreshes. Stellantis announced in early 2026 that the Pacifica Plug-in Hybrid would be discontinued after MY2026 production wind-down as the parent pivots away from PHEVs in North America in favor of HEV and REEV powertrains. MY2025 and MY2026 inventory still available at US dealers as of May 2026. Sources: https://www.chrysler.com/pacifica-hybrid.html ; https://www.thedrive.com/news/all-jeep-and-chrysler-plug-in-hybrid-models-are-officially-dead-exclusive ; https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=46912",
  powertrainOptions: ["PHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.chrysler.com/pacifica/hybrid/specs.plugin-hybrid-select.html\n- https://www.chrysler.com/pacifica/hybrid/specs.plugin-hybrid-pinnacle.html\n- https://www.edmunds.com/chrysler/pacifica/2026/plug-in-hybrid/\n- https://www.edmunds.com/chrysler/pacifica/2025/plug-in-hybrid/\n- https://www.kbb.com/chrysler/pacifica-hybrid/\n- https://cars.usnews.com/cars-trucks/chrysler/pacifica-hybrid\n- https://www.iihs.org/ratings/vehicle/chrysler/pacifica-hybrid-minivan/2026\n- https://www.cars.com/articles/stellantis-discontinues-chrysler-and-jeep-plug-in-hybrid-vehicles-520181/",
  exclusionReason: "All years excluded",
  carMakeSlug: "chrysler",
} as const satisfies CarModel
