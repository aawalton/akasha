import type { CarModel } from "../car-model.page-type.ts"

export const genesisGv60 = {
  id: "019e4adc-e002-7df5-a5e2-914568a52d42",
  pageTypeSlug: "car-model",
  slug: "genesis-gv60",
  title: "GV60",
  bodyStyle: "crossover",
  generation: "1st gen (E-GMP platform, JW)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GV60 is Genesis's first dedicated BEV, launched for the 2023 model year on Hyundai Motor Group's 800V E-GMP platform (shared with Hyundai Ioniq 5, Kia EV6). It's a small luxury crossover targeting buyers who want a tech-forward, performance-leaning EV alternative to the Audi Q4 e-tron / Tesla Model Y / BMW iX1 (n.a. in US). Standout features include face-recognition unlock, fingerprint start, the dual-display 'Crystal Sphere' shifter, and a 483-hp Boost Mode on the Performance trim ([Edmunds 2025](https://www.edmunds.com/genesis/gv60/2025/features-specs/), [Edmunds 2026](https://www.edmunds.com/genesis/gv60/)). For 2026 Genesis upgraded the battery from 77.4 kWh to 84 kWh and added a native NACS port plus a 27-inch OLED display, materially extending range and tightening pricing ([Genesis USA — GV60](https://www.genesis.com/us/en/gv60)).",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- [Genesis USA — GV60](https://www.genesis.com/us/en/gv60)\n- [Edmunds 2025 GV60 specs](https://www.edmunds.com/genesis/gv60/2025/features-specs/)\n- [Edmunds 2026 GV60 specs](https://www.edmunds.com/genesis/gv60/2026/features-specs/)\n- [KBB 2025 GV60](https://www.kbb.com/genesis/gv60/2025/specs/)\n- [CarBuzz 2026 GV60](https://carbuzz.com/cars/genesis/gv60/2026/specs-and-trims/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "genesis",
} as const satisfies CarModel
