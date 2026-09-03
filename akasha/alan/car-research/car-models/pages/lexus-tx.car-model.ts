import type { CarModel } from "../car-model.page-type.ts"

export const lexusTx = {
  id: "019e4aef-54c0-726c-91d7-527e8396ab8b",
  pageTypeSlug: "car-model",
  slug: "lexus-tx",
  title: "TX",
  bodyStyle: "suv",
  generation: "1st gen",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus TX is a 3-row luxury midsize/full-size SUV introduced for MY2024. Electrified variants include TX 500h (turbo hybrid AWD, 366 hp) and TX 550h+ PHEV (using the V6 PHEV system, 404 hp combined). Shared platform with Toyota Grand Highlander. Sources: https://www.lexus.com/models/TX , https://pressroom.lexus.com/all-new-2024-lexus-tx/",
  powertrainOptions: ["HEV", "PHEV", "ICE"],
  segment: "luxury-full-size",
  shortList: false,
  sources: "- Lexus TX\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
