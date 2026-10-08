import type { CarYear } from "akasha/alan/car-research/car-year/car-year.page-type.types.ts"

export const toyotaTundraHybrid2025 = {
  id: "019e4b0c-b9dc-7642-9dda-47f69fc075e2",
  type: "page-type/car-year",
  slug: "toyota-tundra-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover. i-FORCE MAX HEV continues. Source: https://pressroom.toyota.com/2025-toyota-tundra/",
  shortList: false,
  sources: "- https://www.toyota.com/tundrahybrid/2025/",
  exclusionReason: "All trims excluded",
  carModel: "car-model/toyota-tundra-hybrid",
  createdAt: "2026-05-21T14:59:45.756Z",
  updatedAt: "2026-09-15T16:06:42.000Z",
} as const satisfies CarYear
