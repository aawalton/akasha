import type { CarModel } from "../car-model.page-type.ts"

export const cadillacEscaladeIql = {
  id: "019e4ad7-08b7-743f-9c1e-7615016c8d7b",
  pageTypeSlug: "car-model",
  slug: "cadillac-escalade-iql",
  title: "Escalade IQL",
  bodyStyle: "suv",
  generation: "1st gen (BT1 platform)",
  modelYearsAvailable: "2026",
  overview:
    "The Escalade IQL is the long-wheelbase variant of the Escalade IQ, all-new for the 2026 model year. Shares the same BT1 platform and 205-kWh Ultium battery as the standard IQ, adds approximately 7 inches of overall length for more third-row legroom and cargo space. Same dual-motor AWD powertrain (680 hp standard, 750 hp Velocity Max). Sources: [GMAuthority IQL pricing](https://gmauthority.com/blog/2025/03/2026-cadillac-escalade-iql-pricing-for-all-trim-levels-announced/), [Cadillac of Calabasas IQL trims](https://www.cadillacofcalabasas.com/research/escalade-iql-trims/).",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- [GMAuthority IQL pricing](https://gmauthority.com/blog/2025/03/2026-cadillac-escalade-iql-pricing-for-all-trim-levels-announced/)\n- [Cadillac of Calabasas IQL trims](https://www.cadillacofcalabasas.com/research/escalade-iql-trims/)\n- [Edmunds 2026 IQL](https://www.edmunds.com/cadillac/escalade-iql/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
