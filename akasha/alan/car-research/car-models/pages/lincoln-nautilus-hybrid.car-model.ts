import type { CarModel } from "../car-model.page-type.ts"

export const lincolnNautilusHybrid = {
  id: "019e4ae9-ae7a-715b-a45f-e606975ae29c",
  pageTypeSlug: "car-model",
  slug: "lincoln-nautilus-hybrid",
  title: "Nautilus Hybrid",
  bodyStyle: "suv",
  generation: "3rd gen (CX430, 2024-present, redesigned)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Nautilus Hybrid is the full-hybrid (HEV, non-plug-in) variant of Lincoln's two-row midsize luxury SUV. It pairs a 2.0L turbocharged four-cylinder gasoline engine with a 100-kW electric motor and a CVT, producing 310 hp combined (vs. 250 hp for the non-hybrid 2.0T). All-wheel drive is standard. The third-generation Nautilus is built on Ford's CX430 platform alongside the Chinese-market Lincoln Nautilus and is assembled in Hangzhou, China. The cabin features a 48-inch panoramic display spanning the dash plus an 11.1-inch center touchscreen. Available across all three trims (Premiere, Reserve, Black Label). Sources: https://www.lincoln.com/luxury-suvs/nautilus/ , https://cars.usnews.com/cars-trucks/lincoln/nautilus-hybrid/2025 , https://www.thedrive.com/car-reviews/2025-lincoln-nautilus-hybrid-review",
  powertrainOptions: ["HEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- Lincoln Nautilus: https://www.lincoln.com/luxury-suvs/nautilus/\n- US News 2025: https://cars.usnews.com/cars-trucks/lincoln/nautilus-hybrid/2025\n- KBB 2025: https://www.kbb.com/lincoln/nautilus/2025/\n- The Drive review: https://www.thedrive.com/car-reviews/2025-lincoln-nautilus-hybrid-review",
  exclusionReason: "All years excluded",
  carMakeSlug: "lincoln",
} as const satisfies CarModel
