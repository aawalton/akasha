import type { CarModel } from "../car-model.page-type.ts"

export const fordF150Hybrid = {
  id: "019e4add-c908-790e-9e4f-de0f677466a1",
  pageTypeSlug: "car-model",
  slug: "ford-f-150-hybrid",
  title: "F-150 Hybrid",
  bodyStyle: "truck",
  generation: "14th gen (P702, 2021-present, 2024 facelift)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The hybrid (PowerBoost) variant of Ford's flagship full-size pickup. Pairs a 3.5L EcoBoost twin-turbo V6 with a 35 kW electric motor between the engine and 10-speed automatic, drawing from a 1.5 kWh lithium-ion battery for a combined 430 hp / 570 lb-ft (some sources 420/570). Best-in-class hybrid V6 towing (up to 12,700 lb properly equipped) and Pro Power Onboard up to 7.2 kW. MY2025 made PowerBoost available on more trims. MY2026 expands PowerBoost availability across STX, XLT, Lariat, King Ranch, and Platinum (no longer 4x4-only on high trims — 4x2 now available on Lariat/KR/Platinum, lowering base MSRP). PowerBoost premium over 3.5L EcoBoost is ~$1,340. Sources: [Ford.com F-150](https://www.ford.com/trucks/f150/), [Edmunds F-150 Hybrid 2026](https://www.edmunds.com/ford/f-150/2026/hybrid/).",
  powertrainOptions: ["HEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- [Ford.com F-150 2026](https://www.ford.com/trucks/f150/)\n- [Ford.com F-150 2025](https://www.ford.com/trucks/f150/2025/)\n- [Edmunds F-150 Hybrid](https://www.edmunds.com/ford/f-150/2026/hybrid/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "ford",
} as const satisfies CarModel
