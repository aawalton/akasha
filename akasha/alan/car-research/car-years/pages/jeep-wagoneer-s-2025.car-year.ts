import type { CarYear } from "../car-year.page-type.ts"

export const jeepWagoneerS2025 = {
  id: "019e4ae2-778d-7b95-b2d2-fb9a0e26cb40",
  pageTypeSlug: "car-year",
  slug: "jeep-wagoneer-s-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "First-ever Wagoneer S model year. Launched October 2024 with the fully-loaded Launch Edition ($71,995 incl. dest) as the only initial trim, joined in early 2025 by the Limited trim ($67,195) at a lower price point. 100.5 kWh battery, 294-mile EPA range (Launch Edition) / 303-mile EPA range (Limited). Ships with CCS1 port plus complimentary NACS adapter. Sources: https://www.jeep.com/wagoneer/wagoneer-s.html, https://www.edmunds.com/jeep/wagoneer-s/",
  shortList: false,
  sources:
    "- https://www.jeep.com/wagoneer/wagoneer-s/specs.html\n- https://www.jeep.com/wagoneer/wagoneer-s/specs.launch-edition.html\n- https://www.edmunds.com/jeep/wagoneer-s/",
  exclusionReason: "All trims excluded",
  carModelSlug: "jeep-wagoneer-s",
} as const satisfies CarYear
