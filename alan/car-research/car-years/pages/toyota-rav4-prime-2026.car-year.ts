import type { CarYear } from "../car-year.page-type.ts"

export const toyotaRav4Prime2026 = {
  id: "019e4b02-5e26-712d-8c77-45c7afb2a3cc",
  pageTypeSlug: "car-year",
  slug: "toyota-rav4-prime-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Redesign year alongside RAV4 Hybrid. Toyota announced the new RAV4 lineup is electrified-only for MY2026; PHEV variant continues as part of the redesigned platform with updated styling and infotainment. Expected to retain ~42-mile electric range and 302 hp output, with possible incremental improvements. Source: https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4prime/2026/\n- https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-rav4-prime",
} as const satisfies CarYear
