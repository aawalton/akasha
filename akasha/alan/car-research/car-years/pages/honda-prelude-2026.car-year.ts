import type { CarYear } from "../car-year.page-type.ts"

export const hondaPrelude2026 = {
  id: "019e4ae2-96a6-77cf-a1bb-1768ba9ad7c2",
  pageTypeSlug: "car-year",
  slug: "honda-prelude-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Launch year for the resurrected Prelude nameplate (first Prelude since 2001's BB8 fifth-gen). Two-motor e:HEV powertrain shared with Civic Hybrid (200 hp / 232 lb-ft combined). Civic Type R chassis hardware (dual-axis front suspension, larger brakes). New Honda S+ Shift simulated 8-speed paddle mode. Two trims: Hybrid ($42,000) and Hybrid Two-Tone ($42,500). 0-60 mph around 6.5 sec. EPA 46 city / 41 highway. Arrives at US dealers fall 2025.\n\nSources:\n- https://hondanews.com/en-US/honda-automobiles/releases/2026-honda-prelude-revealed-iconic-model-returns-with-hybrid-electric-power-type-r-chassis-hardware-and-new-honda-s-shift\n- https://automobiles.honda.com/prelude/specs-features-trim-comparison",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/prelude\n- https://www.edmunds.com/honda/prelude/2026/\n- https://hondanews.com/en-US/honda-automobiles/releases/2026-honda-prelude-revealed-iconic-model-returns-with-hybrid-electric-power-type-r-chassis-hardware-and-new-honda-s-shift",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-prelude",
} as const satisfies CarYear
