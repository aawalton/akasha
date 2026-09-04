import type { CarModel } from "../car-model.page-type.ts"

export const audiQ5E = {
  id: "019e4ad8-265f-7dc7-96dd-e53f5a8577c9",
  pageTypeSlug: "car-model",
  slug: "audi-q5-e",
  title: "Q5 e",
  bodyStyle: "suv",
  generation: "2nd gen (FY, B9-based)",
  modelYearsAvailable: "2025",
  overview:
    "The Q5 e (marketed as Q5 55 TFSI e Plug-In Hybrid) is the PHEV variant of the second-generation Q5 compact luxury SUV. Combines a 2.0L turbo I4, a 7-speed S tronic dual-clutch, and a 14.4 kWh usable lithium-ion battery for 362 hp and 23 miles EPA-rated electric range. The all-new third-generation Q5 (MY2026) is offered in the US as gas-only at launch; the Q5 e-hybrid built on the new PPC platform is sold in Europe but not confirmed for US for MY2026 at time of writing. So Q5 e Plug-In Hybrid is effectively a 2025-only nameplate in the US Audi lineup. Sources: https://www.edmunds.com/audi/q5/2025/plug-in-hybrid/ ; https://www.auditurnersville.com/2025-audi-q5-e-specs-features-model-review-turnersville-nj.htm ; https://carbuzz.com/2026-audi-q5-phev-revealed/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.audiusa.com/en/models/q5/\n- https://www.edmunds.com/audi/q5/2025/plug-in-hybrid/\n- https://www.auditurnersville.com/2025-audi-q5-e-specs-features-model-review-turnersville-nj.htm\n- https://carbuzz.com/2026-audi-q5-phev-revealed/",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
