import type { CarModel } from "../car-model.page-type.ts"

export const maseratiGranturismoFolgore = {
  id: "019e4aed-113e-7211-ae2d-e5edbe3554a8",
  pageTypeSlug: "car-model",
  slug: "maserati-granturismo-folgore",
  title: "GranTurismo Folgore",
  bodyStyle: "coupe",
  generation: "M189 (2nd gen GranTurismo, Folgore BEV variant)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GranTurismo Folgore is the all-electric variant of Maserati's flagship 2+2 grand-touring coupe, sharing the M189 platform with the V6 Modena and Trofeo trims. It is a tri-motor (one front, two rear via a torque-vectoring axle), all-wheel-drive 2+2 with 751 hp standard / 818 hp on overboost and 996 lb-ft of torque, fed by an 83 kWh usable / 92.5 kWh gross 800V T-bone battery pack ([Maserati US — GranTurismo Folgore](https://www.maserati.com/us/en/models/granturismo/granturismo-folgore), [InsideEVs](https://insideevs.com/news/724923/maserati-granturismo-folgore-epa-range/)). 0-60 in 2.6 s, 199 mph top speed, EPA range 242 mi. Folgore launched for US MY2024 and continues into MY2026 with minor option / pricing updates. Targeted at the luxury-EV GT buyer who would otherwise consider a Porsche Taycan Turbo S / Lucid Air Sapphire / Audi RS e-tron GT.",
  powertrainOptions: ["BEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- [Maserati US — GranTurismo Folgore](https://www.maserati.com/us/en/models/granturismo/granturismo-folgore)\n- [Cars.com — 2025 GranTurismo Folgore](https://www.cars.com/research/maserati-granturismo_folgore-2025/)\n- [InsideEVs — EPA range](https://insideevs.com/news/724923/maserati-granturismo-folgore-epa-range/)\n- [EV Database — GranTurismo Folgore](https://ev-database.org/car/1803/Maserati-GranTurismo-Folgore)\n- [TrueCar — 2026 GranTurismo Folgore](https://www.truecar.com/overview/maserati/granturismo-folgore/2026/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "maserati",
} as const satisfies CarModel
