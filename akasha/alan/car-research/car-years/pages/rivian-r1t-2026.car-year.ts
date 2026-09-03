import type { CarYear } from "../car-year.page-type.ts"

export const rivianR1t2026 = {
  id: "019e4af6-d348-7dbf-b976-5b9a8b36d537",
  pageTypeSlug: "car-year",
  slug: "rivian-r1t-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 carries forward the Gen-2 platform with two notable changes: (1) native NACS (SAE J3400) charge port replaces CCS1 — Tesla Superchargers reachable without an adapter; CCS-to-NACS adapter shipped for legacy CCS sites; (2) modest price increases (~$1k across trims) and added Quad Launch Edition. Lineup remains Dual Standard / Dual / Tri / Quad + Quad Launch Edition. Charging speed improvements from the 2026.07 OTA cut 10-80% times further. Sources: https://electrek.co/2025/06/12/we-have-the-starting-pricing-for-all-model-year-2026-rivian-r1-trims/ ; https://riviantrackr.com/news/rivians-2026-07-software-update-delivers-a-major-dc-fast-charging-improvement/ ; https://rivian.com/r1t",
  shortList: false,
  sources:
    "- https://rivian.com/r1t\n- https://www.edmunds.com/rivian/r1t/\n- https://electrek.co/2025/06/12/we-have-the-starting-pricing-for-all-model-year-2026-rivian-r1-trims/\n- https://www.carsdirect.com/rivian/r1t/2026\n- https://riviantrackr.com/news/rivians-2026-07-software-update-delivers-a-major-dc-fast-charging-improvement/",
  exclusionReason: "All trims excluded",
  carModelSlug: "rivian-r1t",
} as const satisfies CarYear
