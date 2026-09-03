import type { CarModel } from "../car-model.page-type.ts"

export const mitsubishiOutlander = {
  id: "019e4af2-69b7-7a33-a7d5-e7497d727de0",
  pageTypeSlug: "car-model",
  slug: "mitsubishi-outlander",
  title: "Outlander",
  bodyStyle: "suv",
  generation: "4th gen (GN0W, 2022+; 48V mild-hybrid introduced MY2026)",
  modelYearsAvailable: "2026",
  overview:
    "The Outlander (non-PHEV) is the three-row (5+2) compact crossover sibling to the Outlander PHEV. For MY2026 Mitsubishi replaced the prior 2.5L naturally-aspirated four with a new Mitsubishi-designed 1.5L turbocharged inline-four paired with a 48V belt-starter-generator (BSG) mild-hybrid system, making it the first electrified non-PHEV Outlander sold in the US. The 2025 Outlander (non-PHEV) used a pure-ICE 2.5L MIVEC engine and is therefore out of scope for this brief; only MY2026 is in scope. Trim ladder for 2026: ES / new LE / SE / SEL with Black Edition, Trail Edition, and RALLIART appearance derivatives. FWD standard on ES/SE/SEL, S-AWC AWD optional ($1,800) or standard on Trail Edition. Sources: [Mitsubishi 2026 Outlander pricing release](https://media.mitsubishicars.com/en-US/releases/2026-outlander-full-pricing-and-packaging), [Autoblog: 2026 Outlander mild-hybrid coverage](https://www.autoblog.com/news/2026-mitsubishi-outlander-adds-mild-hybrid-power-while-staying-under-30k), [Carscoops: 2026 Outlander hybrid details](https://www.carscoops.com/2026/04/2026-mitsubishi-outlander-hybrid/).",
  powertrainOptions: ["MHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- [Mitsubishi 2026 Outlander pricing release](https://media.mitsubishicars.com/en-US/releases/2026-outlander-full-pricing-and-packaging)\n- [Mitsubishi Outlander trims page](https://www.mitsubishicars.com/cars-and-suvs/outlander/trims)\n- [Autoblog 2026 Outlander MHEV coverage](https://www.autoblog.com/news/2026-mitsubishi-outlander-adds-mild-hybrid-power-while-staying-under-30k)\n- [Carscoops 2026 Outlander hybrid](https://www.carscoops.com/2026/04/2026-mitsubishi-outlander-hybrid/)\n- [CarBuzz 2026 Outlander pricing](https://carbuzz.com/2026-mitsubishi-outlander-pricing-packaging/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "mitsubishi",
} as const satisfies CarModel
