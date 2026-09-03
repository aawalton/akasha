import type { CarYear } from "../car-year.page-type.ts"

export const volvoEx902025 = {
  id: "019e4afe-51ac-7b10-8b4b-6bad1d9f01ed",
  pageTypeSlug: "car-year",
  slug: "volvo-ex90-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "EX90 ramped through 2025 with ongoing OTA software waves to enable features that shipped disabled at the 2024 launch (wireless Apple CarPlay, full Pilot Assist, bidirectional charging marketing). Twin Motor and Twin Motor Performance available. NACS adapter included as standard with MY2025 cars; charging via 400V DC up to ~250 kW. MSRP starts around $81,290. Sources: https://recharged.com/articles/volvo-ex90-software-update-history, https://www.volvocars.com/us/l/north-american-charging-standard/",
  shortList: false,
  sources:
    "- https://recharged.com/articles/volvo-ex90-software-update-history\n- https://www.volvocars.com/us/l/north-american-charging-standard/",
  exclusionReason:
    "All trims excluded for kill switch (interior-sensing impairment-detection system)",
  carModelSlug: "volvo-ex90",
} as const satisfies CarYear
