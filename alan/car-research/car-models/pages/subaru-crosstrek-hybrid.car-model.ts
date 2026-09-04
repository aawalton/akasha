import type { CarModel } from "../car-model.page-type.ts"

export const subaruCrosstrekHybrid = {
  id: "019e4af7-41c8-7ca5-92a6-cb014763c3a9",
  pageTypeSlug: "car-model",
  slug: "subaru-crosstrek-hybrid",
  title: "Crosstrek Hybrid",
  bodyStyle: "crossover",
  generation: "3rd gen Crosstrek (GU, MY2024+) with next-gen Toyota-derived hybrid",
  modelYearsAvailable: "2026",
  overview:
    "All-new for MY2026, the Crosstrek Hybrid revives Subarus subcompact hybrid SUV (the previous Crosstrek Hybrid was a PHEV variant discontinued after MY2023). This 2026 version is a standard hybrid (HEV), not a plug-in. It uses the same next-generation Subaru/Toyota hybrid system as the Forester Hybrid: 2.5L Atkinson/Miller-cycle BOXER engine + electric motors + Symmetrical AWD via CVT, 194 hp combined, EPA-estimated 36 mpg combined, nearly 600 miles of total driving range [https://media.subaru.com/pressrelease/2335/subaru-announces-pricing-2026-crosstrek-including-new-2026]. Two trims at launch: Sport Hybrid and Limited Hybrid. Maintains 8.7 in ground clearance. Arrived at retailers in fall 2025.",
  powertrainOptions: ["HEV"],
  segment: "subcompact",
  shortList: false,
  sources:
    "- https://www.subaru.com/vehicles/crosstrek/hybrid/2026.html\n- https://media.subaru.com/pressrelease/2335/subaru-announces-pricing-2026-crosstrek-including-new-2026\n- https://www.edmunds.com/subaru/crosstrek/2026/hybrid/\n- https://www.kbb.com/subaru/crosstrek-hybrid/2026/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "subaru",
} as const satisfies CarModel
