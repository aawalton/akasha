import type { CarModel } from "../car-model.page-type.ts"

export const teslaCybertruck = {
  id: "019e4af8-3e13-72ad-991b-760723f4d8ee",
  pageTypeSlug: "car-model",
  slug: "tesla-cybertruck",
  title: "Cybertruck",
  bodyStyle: "truck",
  generation: "1st gen (2023-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tesla Cybertruck is Tesla's full-size electric pickup, unveiled 2019, deliveries started Nov 2023. Defined by its angular bare stainless-steel exoskeleton body (no paint), 48V electrical architecture (industry-first at this scale), 800V powertrain, structural battery pack, steer-by-wire, four-wheel steering, air suspension. Production fell well below initial demand projections: only ~46,000 built through Feb 2025 (vs. Musk's pre-launch claim of 250,000+/year). For MY2025/2026 Tesla simplified to two trims after dropping the cheaper RWD: AWD Dual Motor ($69,990, 600hp est, 4.1s 0-60, 350mi range) and Cyberbeast tri-motor ($114,990, 845hp est, 2.6s 0-60, 320mi range). 11,000lb max towing across both. Extensive recall history including the high-profile April 2024 accelerator pedal pad recall and the March 2025 cant-rail trim delamination recall affecting all 46,096 trucks built to that point. NACS port. Sources: https://en.wikipedia.org/wiki/Tesla_Cybertruck , https://www.edmunds.com/tesla/cybertruck/ , https://www.kbb.com/tesla/cybertruck/2025/specs/ , https://electrek.co/2025/03/20/tesla-recalls-all-cybertrucks-ever-made-over-trim-falling-off/",
  powertrainOptions: ["BEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/Tesla_Cybertruck\n- https://www.edmunds.com/tesla/cybertruck/\n- https://www.kbb.com/tesla/cybertruck/2025/specs/\n- https://electrek.co/2025/03/20/tesla-recalls-all-cybertrucks-ever-made-over-trim-falling-off/\n- https://evchargingstations.com/chargingnews/2026-tesla-cybertruck/\n- https://recharged.com/articles/2025-tesla-cybertruck-recalls-list",
  exclusionReason: "All years excluded",
  carMakeSlug: "tesla",
} as const satisfies CarModel
