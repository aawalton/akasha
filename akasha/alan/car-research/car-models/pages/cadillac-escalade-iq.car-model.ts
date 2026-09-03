import type { CarModel } from "../car-model.page-type.ts"

export const cadillacEscaladeIq = {
  id: "019e4ad6-f045-7f75-9bd8-4bcc059272c0",
  pageTypeSlug: "car-model",
  slug: "cadillac-escalade-iq",
  title: "Escalade IQ",
  bodyStyle: "suv",
  generation: "1st gen (BT1 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Escalade IQ is Cadillac's all-electric full-size luxury SUV, launched as a 2025 model on GM's BT1 EV truck platform (shared with Silverado EV and Sierra EV). 205-kWh Ultium battery, dual motors producing 680 horsepower (750 in Velocity Max), seating for seven, 350 kW DC fast charging, rear-wheel steering, and adaptive air suspension. The 2026 model year adds the long-wheelbase Escalade IQL alongside the standard IQ. Sources: [Edmunds Escalade IQ](https://www.edmunds.com/cadillac/escalade-iq/), [Cadillac.com Escalade IQ](https://www.cadillac.com/electric/escalade-iq).",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- [Cadillac Escalade IQ Official](https://www.cadillac.com/electric/escalade-iq)\n- [Edmunds Escalade IQ](https://www.edmunds.com/cadillac/escalade-iq/)\n- [Cadillac Pasadena IQ overview](https://www.cadillacpasadena.com/cadillac-research/cadillac-escalade-iq-overview/)\n- [GMAuthority 2026 IQ trim revision](https://gmauthority.com/blog/2025/03/2026-cadillac-escalade-iq-gets-revised-trim-level-lineup/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
