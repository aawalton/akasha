import type { CarModel } from "../car-model.page-type.ts"

export const maseratiGrecaleFolgore = {
  id: "019e4aed-65b5-7a78-ae79-44ebdeb5862b",
  pageTypeSlug: "car-model",
  slug: "maserati-grecale-folgore",
  title: "Grecale Folgore",
  bodyStyle: "suv",
  generation: "1st gen Grecale (M182, Folgore BEV variant on Giorgio-based platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Grecale Folgore is the all-electric variant of Maserati's mid-size luxury SUV, sharing the body and Giorgio-derived platform with the V6 Trofeo and (MY25 only in the US) 2.0L MHEV trims. Dual-motor AWD, 550 hp / 604 lb-ft, 97 kWh usable / 105 kWh gross 400V battery, 0-60 in ~4.1 s ([Maserati US — Grecale Folgore](https://www.maserati.com/us/en/models/grecale/grecale-folgore), [EV Database](https://ev-database.org/car/1843/Maserati-Grecale-Folgore)). For MY2026 Maserati added an AWD-disconnect system that decouples the front axle when not needed, reportedly improving range; EPA range was 206-245 mi on MY25 and Maserati is targeting roughly +15% on MY26 (~280 mi) once EPA-certified ([Stellantis Media — Grecale Folgore MY26](https://www.media.stellantis.com/em-en/maserati/press/maserati-grecale-folgore-model-year-2026)). Folgore is positioned against the Porsche Macan Electric, BMW iX, Audi Q8 e-tron, and Mercedes EQE SUV.",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- [Maserati US — Grecale Folgore](https://www.maserati.com/us/en/models/grecale/grecale-folgore)\n- [Cars.com — 2026 Grecale Folgore](https://www.cars.com/research/maserati-grecale_folgore-2026/)\n- [EV Database — Grecale Folgore](https://ev-database.org/car/1843/Maserati-Grecale-Folgore)\n- [Stellantis Media — Grecale Folgore MY26](https://www.media.stellantis.com/em-en/maserati/press/maserati-grecale-folgore-model-year-2026)\n- [US News — 2025 Grecale Folgore reliability](https://cars.usnews.com/cars-trucks/maserati/grecale-folgore/reliability)",
  exclusionReason: "All years excluded",
  carMakeSlug: "maserati",
} as const satisfies CarModel
