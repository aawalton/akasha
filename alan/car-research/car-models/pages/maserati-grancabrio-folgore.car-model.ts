import type { CarModel } from "../car-model.page-type.ts"

export const maseratiGrancabrioFolgore = {
  id: "019e4aed-4093-7c42-9872-b490f3dbf453",
  pageTypeSlug: "car-model",
  slug: "maserati-grancabrio-folgore",
  title: "GranCabrio Folgore",
  bodyStyle: "convertible",
  generation: "M189 (2nd gen GranTurismo / GranCabrio, Folgore BEV variant)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GranCabrio Folgore is the soft-top convertible variant of the GranTurismo Folgore, marketed by Maserati as the world's first luxury electric four-seat convertible ([Maserati US — GranCabrio Folgore](https://www.maserati.com/us/en/models/grancabrio/grancabrio-folgore), [Edmunds](https://www.edmunds.com/maserati/grancabrio-folgore/)). It shares the M189 platform, 800V architecture, 83 kWh usable / 92.5 kWh gross battery, and tri-motor 751 hp / 996 lb-ft drivetrain with the coupe; weighs about 5,100 lb (~150 lb heavier than the coupe for chassis reinforcements + top mechanism), still hits 0-62 mph in 2.8 s and 180 mph top speed. EPA range 233 mi. Launched for US MY2025 alongside the V6 Trofeo convertible; continues into MY2026.",
  powertrainOptions: ["BEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- [Maserati US — GranCabrio Folgore](https://www.maserati.com/us/en/models/grancabrio/grancabrio-folgore)\n- [Cars.com — 2025 GranCabrio Folgore](https://www.cars.com/research/maserati-grancabrio_folgore-2025/)\n- [Edmunds — GranCabrio Folgore](https://www.edmunds.com/maserati/grancabrio-folgore/)\n- [EV Database — GranCabrio Folgore](https://ev-database.org/uk/car/2187/Maserati-GranCabrio-Folgore)\n- [Autocar — 2026 GranCabrio Folgore review](https://www.autocar.co.uk/car-review/maserati/grancabrio-folgore)",
  exclusionReason: "All years excluded",
  carMakeSlug: "maserati",
} as const satisfies CarModel
