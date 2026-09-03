import type { CarModel } from "../car-model.page-type.ts"

export const kiaCarnivalHybrid = {
  id: "019e4aee-c1bf-76c0-ad4d-c805995c5e5b",
  pageTypeSlug: "car-model",
  slug: "kia-carnival-hybrid",
  title: "Carnival Hybrid",
  bodyStyle: "minivan",
  generation: "4th gen (KA4); 1.6T parallel hybrid added for MY2025",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Carnival MPV is Kia's minivan, sold in the US as the Carnival. For MY2025 Kia added a Hybrid variant — combining the 1.6T gas engine with an electric motor and 6-speed automatic for ~287 hp / 271 lb-ft (242 hp in some Kia spec references; combined figure varies by source). Four trims (LXS, EX, SX, SX Prestige). FWD only. 33 mpg combined (vs ~21 mpg ICE). MY2026 carryover with ~$190 price bumps. Sources: https://www.kia.com/us/en/carnival-mpv-hybrid , https://www.edmunds.com/kia/carnival-hybrid/2025/ , https://cars.usnews.com/cars-trucks/kia/carnival-hybrid",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/carnival-mpv-hybrid\nhttps://www.kia.com/us/en/carnival-mpv-hybrid/specs-compare\nhttps://www.edmunds.com/kia/carnival-hybrid/2025/\nhttps://cars.usnews.com/cars-trucks/kia/carnival-hybrid",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
