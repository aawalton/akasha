import type { CarModel } from "../car-model.page-type.ts"

export const chevroletBlazerEv = {
  id: "019e4ad9-f757-7dd6-bf90-ac49fc7ea3d7",
  pageTypeSlug: "car-model",
  slug: "chevrolet-blazer-ev",
  title: "Blazer EV",
  bodyStyle: "suv",
  generation: "1st gen (Ultium / BEV2 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Chevrolet Blazer EV is a midsize battery-electric crossover on GM's Ultium platform, sized between the Equinox EV and the larger Silverado/Suburban EVs. Launched as a 2024 model in 2023, it had a high-profile multi-month stop-sale in late 2023/early 2024 over software defects. Available in LT (FWD/AWD), RS (RWD/AWD), and SS (AWD-only, 615 hp). Shares its platform with the Cadillac Lyriq and Honda Prologue (rebadged Blazer EV). For 2026, RWD RS was discontinued. Sources: [Chevrolet Blazer EV](https://www.chevrolet.com/electric/blazer-ev), [The Verge stop-sale](https://www.theverge.com/2023/12/20/24010098/gm-chevy-blazer-ev-stop-sale-software-issues).",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- [Chevrolet Blazer EV](https://www.chevrolet.com/electric/blazer-ev)\n- [Edmunds 2025](https://www.edmunds.com/chevrolet/blazer-ev/2025/features-specs/)\n- [Edmunds 2026](https://www.edmunds.com/chevrolet/blazer-ev/)\n- [KBB 2026](https://www.kbb.com/chevrolet/blazer-ev/)",
  exclusionReason: "American car manufacturer — personal exclusion",
  carMakeSlug: "chevrolet",
} as const satisfies CarModel
