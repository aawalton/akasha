import type { CarYear } from "../car-year.page-type.types.ts"

export const toyotaCrown2026 = {
  id: "019e4b05-d445-7abf-bcdb-b05d35cc2a95",
  pageTypeSlug: "car-year",
  type: "car-year",
  slug: "toyota-crown-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes: "Carryover from MY2025. Source: https://www.toyota.com/crown/2026/",
  shortList: false,
  sources: "- https://www.toyota.com/crown/2026/",
  exclusionReason: "All trims excluded",
  carModel: "toyota-crown",
} as const satisfies CarYear
