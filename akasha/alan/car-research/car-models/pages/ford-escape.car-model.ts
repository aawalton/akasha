import type { CarModel } from "../car-model.page-type.ts"

export const fordEscape = {
  id: "019e4ade-2428-735b-916e-f0e35628d8fa",
  pageTypeSlug: "car-model",
  slug: "ford-escape",
  title: "Escape",
  bodyStyle: "crossover",
  generation: "4th gen (C2 platform, 2020-2026, 2023 facelift)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Ford's long-running compact crossover, on its final model year for MY2026. Built on the C2 platform at Louisville Assembly. US Escape production ended December 2025; MY2026 is the final inventory phase-out, with no new units beyond the Aug 2025 announcement. Available powertrains MY2025/2026: 1.5L EcoBoost (Active), 2.0L EcoBoost AWD (ST-Line Elite, Platinum), 2.5L Atkinson Hybrid (FWD or AWD on ST-Line/Select/Elite/Platinum, ~37-39 mpg combined, 192 hp), 2.5L Atkinson PHEV (FWD only, single PHEV trim, 14.4 kWh battery, 37 mi EV range, 210 hp combined). MY2026 not sold in CA, NY, MA, VT, OR, WA (Ford declined CARB recert for a final-year model). Five hybrid trims in MY2025/2026 (Active, ST-Line, ST-Line Select, ST-Line Elite, Platinum); PHEV is its own standalone trim. Sources: [Ford.com Escape 2026](https://www.ford.com/suvs-crossovers/escape/), [Ford Authority - Escape 2026 packages](https://fordauthority.com/2025/10/2026-ford-escape-all-available-packages/), [J.C. Lewis - Escape end of era](https://www.jclewis.com/blog/end-of-an-era-the-2026-ford-escape-and-what-comes-next).",
  powertrainOptions: ["HEV", "PHEV", "ICE"],
  segment: "compact",
  shortList: false,
  sources:
    "- [Ford.com Escape 2026](https://www.ford.com/suvs-crossovers/escape/)\n- [Ford Authority - Escape discontinuation](https://www.jclewis.com/blog/end-of-an-era-the-2026-ford-escape-and-what-comes-next)\n- [Edmunds Escape PHEV 2026](https://www.edmunds.com/ford/escape/2026/plug-in-hybrid/)\n- [Edmunds Escape PHEV 2025](https://www.edmunds.com/ford/escape/2025/plug-in-hybrid/)\n- [Jay Malone - 2026 Escape trims](https://www.jaymaloneford.com/blog/2026/april/11/2026-ford-escape-trim-levels-active-st-line-st-line-select-st-line-elite-platinum-phev.htm)",
  exclusionReason: "All years excluded",
  carMakeSlug: "ford",
} as const satisfies CarModel
