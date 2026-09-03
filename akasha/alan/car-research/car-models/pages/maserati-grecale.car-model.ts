import type { CarModel } from "../car-model.page-type.ts"

export const maseratiGrecale = {
  id: "019e4aed-9810-7c15-a622-074668824a6a",
  pageTypeSlug: "car-model",
  slug: "maserati-grecale",
  title: "Grecale",
  bodyStyle: "suv",
  generation: "1st gen Grecale (M182, ICE/MHEV variants on Giorgio-based platform)",
  modelYearsAvailable: "2025",
  overview:
    "The Grecale (non-Folgore) is Maserati's mid-size luxury SUV with internal-combustion drivetrains. For MY2025 in the US, the base Grecale and Modena trims used a 2.0L turbocharged + electrically-supercharged inline-four with a 48V mild-hybrid system (325 hp / 332 lb-ft), while the Trofeo used a pure-ICE 3.0L Nettuno twin-turbo V6 (523 hp). For MY2026, Maserati discontinued the 2.0L MHEV powertrain in the US lineup and the Modena/Trofeo trims switched to the 3.0L V6 Nettuno (385 hp Modena / 523 hp Trofeo) ([autoevolution — MY26 Grecale Modena V6](https://www.autoevolution.com/news/maserati-sends-2026-grecale-modena-v6-to-north-america-with-nettuno-singing-a-385-hp-opera-265153.html), [Maserati US — Grecale](https://www.maserati.com/us/en/models/grecale)). Because MY2026 contains no electrified ICE-side variants, this Car Model page only carries a 2025 Year/Trim subtree; the Trofeo trim (pure ICE both years) is excluded from research scope per brief. This page is split from `Grecale Folgore` per brief naming rules (separate BEV / ICE versions of nominally the same model).",
  powertrainOptions: ["MHEV", "ICE"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- [Maserati US — Grecale](https://www.maserati.com/us/en/models/grecale)\n- [US News — 2025 Grecale](https://cars.usnews.com/cars-trucks/maserati/grecale)\n- [Bishop Maserati — 2025 Grecale specs](https://www.bishopmaserati.com/model-research/2025-maserati-grecale/)\n- [autoevolution — 2026 Grecale Modena V6](https://www.autoevolution.com/news/maserati-sends-2026-grecale-modena-v6-to-north-america-with-nettuno-singing-a-385-hp-opera-265153.html)\n- [duPont Registry — MY2025 Grecale updates](https://news.dupontregistry.com/blogs/maserati-news/maserati-reveals-my2025-grecale-updates)",
  exclusionReason: "All years excluded",
  carMakeSlug: "maserati",
} as const satisfies CarModel
