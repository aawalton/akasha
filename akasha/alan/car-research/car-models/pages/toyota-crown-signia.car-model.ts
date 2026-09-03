import type { CarModel } from "../car-model.page-type.ts"

export const toyotaCrownSignia = {
  id: "019e4b06-203a-7e92-a02b-e0d179aa0187",
  pageTypeSlug: "car-model",
  slug: "toyota-crown-signia",
  title: "Crown Signia",
  bodyStyle: "wagon",
  generation: "S235 wagon, launched MY2025",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Crown Signia is a hybrid two-row crossover/wagon sharing the Crown sedan's platform. Hybrid-only with 2.5L+eAWD, 240 hp combined, 36 mpg combined. Two trims: XLE and Limited. New for MY2025. Source: https://www.toyota.com/crownsignia/ ; https://pressroom.toyota.com/2025-toyota-crown-signia/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.toyota.com/crownsignia/\n- https://pressroom.toyota.com/2025-toyota-crown-signia/",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
