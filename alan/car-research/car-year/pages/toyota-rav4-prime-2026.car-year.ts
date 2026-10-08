import type { CarYear } from "akasha/alan/car-research/car-year/car-year.page-type.types.ts"

export const toyotaRav4Prime2026 = {
  id: "019e4b02-5e26-712d-8c77-45c7afb2a3cc",
  type: "page-type/car-year",
  slug: "toyota-rav4-prime-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Redesign year alongside RAV4 Hybrid. Toyota announced the new RAV4 lineup is electrified-only for MY2026; PHEV variant continues as part of the redesigned platform with updated styling and infotainment. Expected to retain ~42-mile electric range and 302 hp output, with possible incremental improvements. Source: https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4prime/2026/\n- https://pressroom.toyota.com/2026-toyota-rav4-electrified-lineup/",
  exclusionReason: "All trims excluded",
  carModel: "car-model/toyota-rav4-prime",
  createdAt: "2026-05-21T14:48:26.918Z",
  updatedAt: "2026-09-15T16:06:42.000Z",
} as const satisfies CarYear
