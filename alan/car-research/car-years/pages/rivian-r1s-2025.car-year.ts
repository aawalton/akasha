import type { CarYear } from "../car-year.page-type.ts"

export const rivianR1s2025 = {
  id: "019e4af8-ce74-7489-976c-4c1f5ec8a215",
  pageTypeSlug: "car-year",
  slug: "rivian-r1s-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 is the Gen-2 refresh for the R1S: new in-house drive units (single/dual/tri/quad), zonal electronic architecture, restructured battery options (Standard LFP 92.5 kWh, Large NMC 109 kWh, Max NMC 141.5 kWh), in-cabin driver-monitoring camera, Enhanced Highway Assist hands-free rolled out March 2025, NACS-to-CCS1 DC adapter shipped as standard. Trim lineup is Dual Standard / Dual / Tri / Quad. Sources: https://rivian.com/r1s ; https://www.rivianwave.com/news/2300/rivian-battery-options-range-cost-and-battery-pack-sizes-kwh ; https://stories.rivian.com/enhanced-highway-assist-gen2",
  shortList: false,
  sources:
    "- https://rivian.com/r1s\n- https://www.edmunds.com/rivian/r1s/2025/\n- https://www.kbb.com/rivian/r1s/2025/specs/\n- https://stories.rivian.com/enhanced-highway-assist-gen2",
  exclusionReason: "All trims excluded",
  carModelSlug: "rivian-r1s",
} as const satisfies CarYear
