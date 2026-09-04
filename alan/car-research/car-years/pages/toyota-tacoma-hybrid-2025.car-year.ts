import type { CarYear } from "../car-year.page-type.ts"

export const toyotaTacomaHybrid2025 = {
  id: "019e4b0f-2e1e-7a63-b030-b0a07bde61af",
  pageTypeSlug: "car-year",
  slug: "toyota-tacoma-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Second year of 4th-gen Tacoma. i-FORCE MAX HEV available across mid-and-upper trims. Source: https://pressroom.toyota.com/2025-toyota-tacoma/",
  shortList: false,
  sources: "- https://www.toyota.com/tacoma/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-tacoma-hybrid",
} as const satisfies CarYear
