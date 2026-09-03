import type { CarYear } from "../car-year.page-type.ts"

export const vinfastVf72025 = {
  id: "019e4afa-f8dd-7890-8f0c-e3ba7c4085c7",
  pageTypeSlug: "car-year",
  slug: "vinfast-vf-7-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "VinFast does not publish formal year-over-year refresh changelogs for the US market; the lineup is in a rolling-update mode driven by OTA software updates and mid-cycle pricing/incentive changes rather than discrete MY model-year transitions. EPA certified the MY2025-2026 lineup as a combined record on fueleconomy.gov. For MY2025 the model's hardware spec matches the prior listing; VinFast aggressively adjusts MSRP and stacks 0% financing or cash incentives. Sources: https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://vinfastauto.us/",
  shortList: false,
  sources:
    "https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://vinfastauto.us/",
  exclusionReason: "No US dealer/service network — no Utah presence",
  carModelSlug: "vinfast-vf-7",
} as const satisfies CarYear
