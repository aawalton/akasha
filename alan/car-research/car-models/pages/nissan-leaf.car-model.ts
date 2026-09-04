import type { CarModel } from "../car-model.page-type.ts"

export const nissanLeaf = {
  id: "019e4af2-314c-758e-9cf0-da6700c9487b",
  pageTypeSlug: "car-model",
  slug: "nissan-leaf",
  title: "LEAF",
  bodyStyle: "crossover",
  generation: "3rd gen (ZE1 successor, CMF-EV platform, 2026)",
  modelYearsAvailable: "2026",
  overview:
    "The third-generation Nissan LEAF is an all-new battery-electric vehicle for MY2026, restyled as a sleek crossover (replacing the hatchback silhouette of prior generations). Built on the CMF-EV platform shared with the Ariya, the 2026 LEAF is the lowest-MSRP new EV currently sold in the US ($29,990 starting). It offers a 75-kWh battery (303-mile EPA range S+/SV+) and a smaller 52-kWh battery variant; all are front-wheel-drive single-motor. The 2026 LEAF adopts a native NACS port for direct Tesla Supercharger access without an adapter. Source: https://usa.nissannews.com/en-US/releases/more-features-more-range-still-under-30k-all-new-2026-nissan-leaf-priced-from-29990-msrp ; https://usa.nissannews.com/en-US/releases/2026-nissan-leaf-press-kit",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: true,
  sources:
    "- Nissan USA LEAF: https://www.nissanusa.com/vehicles/electric-cars/leaf/specs-trims.html\n- 2026 LEAF press kit: https://usa.nissannews.com/en-US/releases/2026-nissan-leaf-press-kit\n- Edmunds 2026 LEAF: https://www.edmunds.com/nissan/leaf/\n- Autoblog 2026 LEAF: https://www.autoblog.com/cars/nissan/leaf/2026\n- IIHS LEAF 2026: https://www.iihs.org/ratings/vehicle/nissan/leaf-4-door-hatchback/2026",
  carMakeSlug: "nissan",
} as const satisfies CarModel
