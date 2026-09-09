import type { CarYear } from "../car-year.page-type.types.ts"

export const toyotaSequoia2025 = {
  id: "019e4b0b-8fe1-7f80-9a49-557be8a8a853",
  pageTypeSlug: "car-year",
  type: "car-year",
  slug: "toyota-sequoia-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover from prior year; some option changes. i-FORCE MAX HEV across the lineup. Source: https://pressroom.toyota.com/2025-toyota-sequoia/",
  shortList: false,
  sources: "- https://www.toyota.com/sequoia/2025/",
  exclusionReason: "All trims excluded",
  carModel: "toyota-sequoia",
} as const satisfies CarYear
