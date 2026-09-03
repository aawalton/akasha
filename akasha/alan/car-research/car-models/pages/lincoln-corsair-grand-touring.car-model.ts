import type { CarModel } from "../car-model.page-type.ts"

export const lincolnCorsairGrandTouring = {
  id: "019e4ae7-f96a-7918-a0ec-669777b70576",
  pageTypeSlug: "car-model",
  slug: "lincoln-corsair-grand-touring",
  title: "Corsair Grand Touring",
  bodyStyle: "suv",
  generation: "1st gen (C520, 2020-present, refreshed 2023)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Corsair Grand Touring is the plug-in hybrid variant of Lincoln's entry-level compact luxury SUV. It pairs a 2.5L Atkinson-cycle four-cylinder with two electric motors and a 14.4-kWh lithium-ion battery, producing 266 hp combined and 27 miles of EPA-rated all-electric range. Standard AWD via an eCVT. The Corsair shares its platform with the Ford Escape PHEV. The model received a styling and tech refresh for the 2023 model year and continues into MY2025 and MY2026 with relatively minor updates. Sources: https://www.lincoln.com/luxury-suvs/corsair/ , https://www.edmunds.com/lincoln/corsair/2025/plug-in-hybrid/ , https://topelectricsuv.com/reviews/lincoln-corsair-grand-touring-phev/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- Lincoln Corsair landing: https://www.lincoln.com/luxury-suvs/corsair/\n- 2026 Corsair Grand Touring spec page: https://www.lincoln.com/luxury-suvs/corsair/models/grand-touring-pzev/\n- Edmunds 2025 Corsair PHEV: https://www.edmunds.com/lincoln/corsair/2025/plug-in-hybrid/\n- Edmunds 2026 Corsair PHEV: https://www.edmunds.com/lincoln/corsair/2026/plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lincoln",
} as const satisfies CarModel
