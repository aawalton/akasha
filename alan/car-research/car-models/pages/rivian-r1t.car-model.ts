import type { CarModel } from "../car-model.page-type.ts"

export const rivianR1t = {
  id: "019e4af4-7aa3-7006-89f2-e176119427bb",
  pageTypeSlug: "car-model",
  slug: "rivian-r1t",
  title: "R1T",
  bodyStyle: "truck",
  generation: "Gen 2 (2025 refresh, in-house zonal electronics + new drive units)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Rivian R1T is an all-electric crew-cab mid-size pickup, the company's first production vehicle (launched late 2021). Rivian fully refreshed the R1T for the 2025 model year (Gen 2): a new in-house zonal electronic architecture (~60% fewer ECUs), all-new in-house drive units (single, dual, tri, and quad), revised battery options (Standard LFP, Large NMC, Max NMC), Enhanced Highway Assist with hands-free driving on 135k+ miles of US/Canada highway, and a NACS-to-CCS1 DC adapter shipped standard. MY2026 brings native NACS charge ports. The R1T targets buyers who want a luxury-grade adventure pickup with serious tow ratings (up to 11,000 lb on Max-pack configs), a 4'6\" bed, a unique 11.7 cu ft Gear Tunnel, and a 9.9 cu ft frunk. Sources: https://rivian.com/r1t ; https://stories.rivian.com/enhanced-highway-assist-gen2 ; https://electrek.co/2025/06/12/we-have-the-starting-pricing-for-all-model-year-2026-rivian-r1-trims/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://rivian.com/r1t\n- https://www.edmunds.com/rivian/r1t/\n- https://electrek.co/2025/06/12/we-have-the-starting-pricing-for-all-model-year-2026-rivian-r1-trims/\n- https://stories.rivian.com/enhanced-highway-assist-gen2\n- https://en.wikipedia.org/wiki/Rivian_R1T",
  exclusionReason: "All years excluded",
  carMakeSlug: "rivian",
} as const satisfies CarModel
