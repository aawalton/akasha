import type { CarModel } from "../car-model.page-type.ts"

export const fordMaverickHybrid = {
  id: "019e4add-f062-7188-ab42-a37a87e3f301",
  pageTypeSlug: "car-model",
  slug: "ford-maverick-hybrid",
  title: "Maverick Hybrid",
  bodyStyle: "truck",
  generation: "1st gen (C2 platform, 2022-present, refreshed 2025)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Ford's compact unibody pickup truck — the smallest, most affordable Ford truck and one of the cheapest hybrids sold in the US. Built on the C2 platform shared with Escape/Bronco Sport. Standard powertrain is the 2.5L Atkinson-cycle Hybrid four-cylinder paired with an eCVT and a small NiMH/Li-ion battery, producing 191 hp combined and rated up to 42 mpg city. AWD on the Hybrid became available for the first time in MY2025 (was FWD-only 2022-2024). Two body sizes are not offered — only a 4-door SuperCrew with a 4.5-ft bed. Trims for MY2025/2026: XL, XLT, Lariat, plus EcoBoost-only Lobo and Tremor. MY2026 retains the same hybrid trim mix; Lobo (street-performance) and Tremor (off-road) remain EcoBoost-only. Sources: [Ford.com Maverick 2026](https://www.ford.com/trucks/maverick/), [Edmunds 2026 Maverick Hybrid](https://www.edmunds.com/ford/maverick/2026/hybrid/).",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- [Ford.com Maverick 2026](https://www.ford.com/trucks/maverick/)\n- [Ford.com Maverick 2025](https://www.ford.com/trucks/maverick/2025/)\n- [Edmunds Maverick Hybrid](https://www.edmunds.com/ford/maverick/2026/hybrid/)\n- [SlashGear 2025 Maverick Hybrid review](https://www.slashgear.com/1927680/2025-ford-maverick-hybrid-review-price-performance-mpg/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "ford",
} as const satisfies CarModel
