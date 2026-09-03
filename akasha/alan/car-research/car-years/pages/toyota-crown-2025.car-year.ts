import type { CarYear } from "../car-year.page-type.ts"

export const toyotaCrown2025 = {
  id: "019e4b05-5307-7266-ad49-f39c2a5e8992",
  pageTypeSlug: "car-year",
  slug: "toyota-crown-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Minor color/option updates. Two HEV powertrains continue (2.5L hybrid and Hybrid MAX 2.4L turbo). Source: https://pressroom.toyota.com/2025-toyota-crown/",
  shortList: false,
  sources: "- https://www.toyota.com/crown/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-crown",
} as const satisfies CarYear
