import type { CarModel } from "../car-model.page-type.ts"

export const jeepWagoneerS = {
  id: "019e4ae2-5342-7fa9-8862-b50eb6a0ed74",
  pageTypeSlug: "car-model",
  slug: "jeep-wagoneer-s",
  title: "Wagoneer S",
  bodyStyle: "suv",
  generation: "1st gen (STLA Large platform)",
  modelYearsAvailable: "2025",
  overview:
    "The Wagoneer S is Jeep's first global all-electric SUV, launched in late 2024 as a 2025 MY on the STLA Large platform. It is a midsize luxury crossover positioned above the Grand Cherokee in price but slightly smaller in footprint, with dual-motor AWD as standard. Targets the Tesla Model Y / Cadillac Lyriq / BMW iX3 buyer who wants the Jeep badge. As of May 2026, Stellantis has paused 2026 MY production after lower-than-expected 2025 sales (~10,864 units) — the existing 2025 inventory remains the only new Wagoneer S available at US dealers, and the model is expected to return in a refreshed form with REEV options. Sources: https://www.jeep.com/wagoneer/wagoneer-s.html, https://electrek.co/2026/04/21/jeep-shelves-ev-us-2026-promises-improvements/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.jeep.com/wagoneer/wagoneer-s.html\n- https://www.jeep.com/wagoneer/wagoneer-s/specs.html\n- https://www.edmunds.com/jeep/wagoneer-s/\n- https://www.kbb.com/jeep/wagoneer-s/2025/specs/\n- https://electrek.co/2026/04/21/jeep-shelves-ev-us-2026-promises-improvements/",
  exclusionReason: "All years excluded",
  carMakeSlug: "jeep",
} as const satisfies CarModel
