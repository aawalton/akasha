import type { CarModel } from "../car-model.page-type.ts"

export const rivianR1s = {
  id: "019e4af8-a977-7585-83b2-b55cc2d587a6",
  pageTypeSlug: "car-model",
  slug: "rivian-r1s",
  title: "R1S",
  bodyStyle: "suv",
  generation: "Gen 2 (2025 refresh, in-house zonal electronics + new drive units)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Rivian R1S is an all-electric three-row, seven-passenger luxury SUV — Rivian's second production vehicle, sharing the skateboard platform with the R1T pickup. The MY2025 Gen-2 refresh applied the same electronics, in-house drive units, battery options, and Enhanced Highway Assist hands-free rollout described for the R1T. MY2026 adds the native NACS charge port and an IIHS Top Safety Pick+ award — Rivian claims the R1S is the only large SUV from an American automaker to earn TSP+ in 2026. The R1S targets families wanting an electric three-row alternative to a Tahoe/Sequoia/X5 with capable off-road geometry, towing up to 11,000 lb on Max-pack configs, and Rivian's adventure-brand styling. Sources: https://rivian.com/r1s ; https://www.consumerreports.org/cars/rivian/r1s/2026/ratings-specs/ ; https://stories.rivian.com/enhanced-highway-assist-gen2",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://rivian.com/r1s\n- https://www.edmunds.com/rivian/r1s/\n- https://theweeklydriver.com/2026/04/2026-rivian-r1s-buyer-guide/\n- https://www.consumerreports.org/cars/rivian/r1s/2026/ratings-specs/\n- https://en.wikipedia.org/wiki/Rivian_R1S",
  exclusionReason: "All years excluded",
  carMakeSlug: "rivian",
} as const satisfies CarModel
