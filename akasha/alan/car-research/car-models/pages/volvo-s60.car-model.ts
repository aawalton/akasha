import type { CarModel } from "../car-model.page-type.ts"

export const volvoS60 = {
  id: "019e4afd-a071-7549-9837-ffbbd45c5c98",
  pageTypeSlug: "car-model",
  slug: "volvo-s60",
  title: "S60",
  bodyStyle: "sedan",
  generation: "3rd gen (SPA platform, 2018–2025)",
  modelYearsAvailable: "2025",
  overview:
    "The S60 was Volvo's compact luxury sedan — built at Volvo's Ridgeville, South Carolina plant (its only US-manufactured product until the EX90 joined the line). MY2025 is the final year for the US market; production ceased at Ridgeville in June 2024 to free the plant for the EX90 ramp. The earlier S60 Recharge PHEV (T8) was dropped after MY2024; MY2025 was offered only with the B5 48V mild-hybrid powertrain (247 hp, FWD or AWD). No 2026 S60. Sources: https://www.autoblog.com/features/2025-volvo-s60-the-last-model-year-for-the-sedan-in-the-u-s, https://www.motorauthority.com/news/1143552_volvo-s60-sedan-exits-us-after-2025-model-year, https://www.kbb.com/volvo/s60/2025/specs/",
  powertrainOptions: ["MHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.autoblog.com/features/2025-volvo-s60-the-last-model-year-for-the-sedan-in-the-u-s\n- https://carbuzz.com/cars/volvo/s60/2025/\n- https://www.kbb.com/volvo/s60/2025/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
