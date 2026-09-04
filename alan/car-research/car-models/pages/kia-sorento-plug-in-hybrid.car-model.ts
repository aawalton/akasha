import type { CarModel } from "../car-model.page-type.ts"

export const kiaSorentoPlugInHybrid = {
  id: "019e4aed-b697-718f-8c8b-699e7ab2e305",
  pageTypeSlug: "car-model",
  slug: "kia-sorento-plug-in-hybrid",
  title: "Sorento Plug-in Hybrid",
  bodyStyle: "suv",
  generation: "4th gen (MQ4); 1.6T + 13.8 kWh battery PHEV; 3-row; standard AWD",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Sorento Plug-in Hybrid is the three-row PHEV variant — same 1.6T+13.8 kWh battery as the Sportage PHEV but in a longer, taller body with three rows. Combined output 261 hp / 258 lb-ft, standard AWD, 32 mi EPA all-electric range, 74 MPGe combined / 33 mpg in hybrid mode. Two trims (EX, SX Prestige) for MY2025; MY2026 renames SX Prestige to X-Line SX Prestige with X-Line appearance package standard. Source: https://www.kia.com/us/en/sorento-plug-in-hybrid , https://www.kiamedia.com/us/en/models/sorento-phev/2025/specifications",
  powertrainOptions: ["PHEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/sorento-plug-in-hybrid\nhttps://www.kia.com/us/en/sorento-plug-in-hybrid/specs-compare\nhttps://www.kiamedia.com/us/en/models/sorento-phev/2025/specifications\nhttps://cars.usnews.com/cars-trucks/kia/sorento-plug-in-hybrid",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
