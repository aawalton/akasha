import type { CarModel } from "../car-model.page-type.ts"

export const cadillacOptiq = {
  id: "019e4ad6-cf7c-7645-82da-a1ed46b7024f",
  pageTypeSlug: "car-model",
  slug: "cadillac-optiq",
  title: "Optiq",
  bodyStyle: "suv",
  generation: "1st gen (BEV3 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Optiq is Cadillac's smallest and most affordable EV, an all-new compact luxury crossover for the 2025 model year. Five-passenger seating, 85-kWh Ultium battery, dual-motor AWD standard. Positioned as the entry to the Cadillac EV step-ladder. The 2026 model year introduces a single-motor RWD variant and the high-performance Optiq-V. The 2026 Optiq is Cadillac's first vehicle with a native NACS port. Sources: [Edmunds Optiq](https://www.edmunds.com/cadillac/optiq/), [Cadillac.com Optiq](https://www.cadillac.com/electric/optiq).",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- [Cadillac Optiq Official](https://www.cadillac.com/electric/optiq)\n- [Edmunds 2025 Optiq](https://www.edmunds.com/cadillac/optiq/2025/)\n- [Edmunds 2026 Optiq](https://www.edmunds.com/cadillac/optiq/)\n- [Recharged Optiq pricing](https://recharged.com/articles/cadillac-optiq-price)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
