import type { CarModel } from "../car-model.page-type.ts"

export const volvoS90 = {
  id: "019e4afd-b756-7539-8d60-4fa6bbee74e6",
  pageTypeSlug: "car-model",
  slug: "volvo-s90",
  title: "S90",
  bodyStyle: "sedan",
  generation: "2nd gen (SPA platform, 2016–2025)",
  modelYearsAvailable: "2025",
  overview:
    "The S90 was Volvo's flagship sedan — built in Daqing, China and exported to the US. MY2025 is the final year for the US market; production ended in late 2024. Tariff exposure on China-built cars was a contributing factor in Volvo's decision not to bring the refreshed/long-wheelbase global S90 to the US. The S60 Recharge PHEV (T8) was dropped after MY2024; MY2025 was offered only with the B6 48V mild-hybrid powertrain (295 hp, AWD). No 2026 S90. Sources: https://carbuzz.com/volvo-s90-sedan-final-year/, https://www.carsdirect.com/automotive-news/volvo-s90-is-going-to-be-discontinued, https://en.wikipedia.org/wiki/Volvo_S90",
  powertrainOptions: ["MHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://carbuzz.com/cars/volvo/s90/2025/\n- https://www.kbb.com/volvo/s90/2025/specs/\n- https://www.edmunds.com/volvo/s90/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
