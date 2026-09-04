import type { CarYear } from "../car-year.page-type.ts"

export const rivianR1t2025 = {
  id: "019e4af4-b162-75bc-a51a-8767ced6eef8",
  pageTypeSlug: "car-year",
  slug: "rivian-r1t-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 is the Gen-2 refresh: all-new in-house drive units (single-motor, dual-motor, tri-motor, and quad-motor variants), new zonal electronic architecture with ~60% fewer ECUs and 1.6 miles less internal wiring, restructured battery lineup (Standard LFP 92.5 kWh, Large NMC 109 kWh, Max NMC 141.5 kWh), revised dual-motor camera/sensor suite, in-cabin driver-monitoring camera, Enhanced Highway Assist with hands-free driving rolled out via OTA in March 2025, and a Rivian-approved NACS-to-CCS1 DC fast-charge adapter shipped as standard equipment. Trim lineup is Dual Standard / Dual / Tri / Quad. Starting MSRP held at $69,900 (Dual Standard) at launch. Sources: https://rivian.com/r1t ; https://electrek.co/2025/01/23/rivian-rivn-plans-hands-free-driving-this-year-eyes-free-2026/ ; https://www.rivianwave.com/news/2300/rivian-battery-options-range-cost-and-battery-pack-sizes-kwh",
  shortList: false,
  sources:
    "- https://rivian.com/r1t\n- https://www.edmunds.com/rivian/r1t/2025/\n- https://www.kbb.com/rivian/r1t/2025/specs/\n- https://stories.rivian.com/enhanced-highway-assist-gen2\n- https://evchargingstations.com/chargingnews/new-rivian-evs-now-come-with-a-standard-nacs-adapter/",
  exclusionReason: "All trims excluded",
  carModelSlug: "rivian-r1t",
} as const satisfies CarYear
