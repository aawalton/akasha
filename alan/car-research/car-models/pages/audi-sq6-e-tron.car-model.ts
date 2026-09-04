import type { CarModel } from "../car-model.page-type.ts"

export const audiSq6ETron = {
  id: "019e4add-9009-7484-b985-a3084025444e",
  pageTypeSlug: "car-model",
  slug: "audi-sq6-e-tron",
  title: "SQ6 e-tron",
  bodyStyle: "suv",
  generation: "1st gen (PPE platform, 800V)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The SQ6 e-tron is the S-line performance variant of the Q6 e-tron, also offered in standard SUV and Sportback body styles. Dual-motor quattro AWD, 483 hp (509 hp in launch-control mode), 0-60 in 4.1s. Same 800V PPE platform, 94.4 kWh usable battery, 270 kW DC fast charging. EPA-rated 275 mi (20-inch wheels) — performance trade-off vs base Q6. NACS adapter included as port-installed accessory from Sept 2025. Sources: https://www.greencars.com/expert-insights/2025-audi-sq6-e-tron-review-a-stealthy-take-on-ev-performance ; https://media.audiusa.com/models/sq6-e-tron ; https://media.audiusa.com/releases/643",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.audiusa.com/en/models/q6-e-tron/sq6-e-tron/2025/overview/\n- https://media.audiusa.com/models/sq6-e-tron\n- https://www.greencars.com/expert-insights/2025-audi-sq6-e-tron-review-a-stealthy-take-on-ev-performance\n- https://media.audiusa.com/releases/643",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
