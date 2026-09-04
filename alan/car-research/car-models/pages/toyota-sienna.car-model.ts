import type { CarModel } from "../car-model.page-type.ts"

export const toyotaSienna = {
  id: "019e4b0d-bdb1-7fd2-b4fa-37739cc206ef",
  pageTypeSlug: "car-model",
  slug: "toyota-sienna",
  title: "Sienna",
  bodyStyle: "minivan",
  generation: "4th gen (XL40), launched MY2021 — hybrid-only",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Hybrid-only minivan since the 4th-gen launched for MY2021 — Toyota's only minivan and the only mass-market hybrid van in the US until Chrysler Pacifica Hybrid PHEV. 2.5L 4-cyl + electric motors, 245 hp combined, 36 mpg combined, available FWD or e-AWD. Trims: LE, XLE, XSE, Limited, Platinum, Woodland Edition. Source: https://www.toyota.com/sienna/",
  powertrainOptions: ["HEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.toyota.com/sienna/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Sienna.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
