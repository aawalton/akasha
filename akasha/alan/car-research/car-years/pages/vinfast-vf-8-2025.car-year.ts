import type { CarYear } from "../car-year.page-type.ts"

export const vinfastVf82025 = {
  id: "019e4afa-fb59-75c6-9dcd-65d4bee3b8d0",
  pageTypeSlug: "car-year",
  slug: "vinfast-vf-8-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "VinFast does not publish formal year-over-year refresh changelogs for the US market; the lineup is in a rolling-update mode driven by OTA software updates and mid-cycle pricing/incentive changes rather than discrete MY model-year transitions. EPA certified the MY2025-2026 lineup as a combined record on fueleconomy.gov. For MY2025 the model's hardware spec matches the prior listing; VinFast aggressively adjusts MSRP and stacks 0% financing or cash incentives. Sources: https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://vinfastauto.us/",
  shortList: false,
  sources:
    "https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://vinfastauto.us/",
  exclusionReason: "No US dealer/service network — no Utah presence",
  carModelSlug: "vinfast-vf-8",
} as const satisfies CarYear
