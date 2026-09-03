import type { CarModel } from "../car-model.page-type.ts"

export const cadillacLyriq = {
  id: "019e4ad6-9c56-7ee2-9258-a2b41e21c36d",
  pageTypeSlug: "car-model",
  slug: "cadillac-lyriq",
  title: "Lyriq",
  bodyStyle: "suv",
  generation: "1st gen (BEV3 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lyriq is Cadillac's first mass-market EV, a midsize luxury crossover SUV launched in late 2022 as a 2023 model. Built on GM's BEV3 platform using Ultium battery architecture, it serves as Cadillac's flagship volume EV and the foundation for the brand's EV transition. Five-passenger seating, single rear motor or dual-motor AWD. The 2026 model year adds the high-performance Lyriq-V variant at the top of the range. Sources: [Edmunds 2025 Lyriq](https://www.edmunds.com/cadillac/lyriq/2025/), [Cadillac.com Lyriq](https://www.cadillac.com/electric/lyriq).",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- [Cadillac Lyriq Official](https://www.cadillac.com/electric/lyriq)\n- [Edmunds 2025 Lyriq](https://www.edmunds.com/cadillac/lyriq/2025/)\n- [Edmunds 2026 Lyriq](https://www.edmunds.com/cadillac/lyriq/)\n- [KBB 2025 Lyriq](https://www.kbb.com/cadillac/lyriq/2025/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
