import type { CarModel } from "../car-model.page-type.ts"

export const fordMustangMachE = {
  id: "019e4add-5b9f-70f4-a77f-ef799596b5e7",
  pageTypeSlug: "car-model",
  slug: "ford-mustang-mach-e",
  title: "Mustang Mach-E",
  bodyStyle: "crossover",
  generation: "1st gen (CX727 / GE1 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Ford's first dedicated battery-electric SUV, launched as a 2021 MY. A compact crossover with Mustang styling cues, positioned against the Tesla Model Y, Hyundai Ioniq 5, and VW ID.4. Built in Cuautitlán, Mexico on Ford's CX727/GE1 EV platform. Available in Select, Premium, GT, and (from MY2024) Rally trims with two battery sizes — Standard Range LFP and Extended Range NMC — and RWD or AWD (dual-motor) drivetrains. Range tops out at ~320 miles (RWD Premium Extended Range). MY2024 brought BlueCruise 1.3, OTA-improved acceleration, and the Rally trim; MY2025 refined trim mix and pricing; MY2026 reshuffles trims (Select/Premium pricing rises, GT/Rally remain) and adds a California Special package on GT. Tesla Supercharger access via included/optional NACS adapter from Feb 2024. Sources: [Ford.com Mach-E](https://www.ford.com/suvs/mach-e/), [Autoblog 2026 review](https://www.autoblog.com/cars/ford/mustang-mach-e/2026).",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- [Ford.com Mustang Mach-E](https://www.ford.com/suvs/mach-e/)\n- [Edmunds Mach-E](https://www.edmunds.com/ford/mustang-mach-e/)\n- [KBB Mach-E specs](https://www.kbb.com/ford/mustang-mach-e/2025/specs/)\n- [Autoblog 2026 Mach-E](https://www.autoblog.com/cars/ford/mustang-mach-e/2026)",
  exclusionReason: "American car manufacturer — personal exclusion",
  carMakeSlug: "ford",
} as const satisfies CarModel
