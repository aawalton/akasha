import type { CarYear } from "../car-year.page-type.ts"

export const lexusRz2026 = {
  id: "019e4ae7-2db9-79b3-9790-9b78c221ce69",
  pageTypeSlug: "car-year",
  slug: "lexus-rz-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major 2026 refresh: new RZ 350e (FWD, ~224 mi), RZ 500e AWD F SPORT, and flagship RZ 550e F SPORT Performance with 408 hp. NACS charging port standard. Increased battery capacity to 77 kWh (gross). Steer-by-wire optional with yoke. Sources: https://pressroom.lexus.com/2026-lexus-rz-makes-world-debut/ , https://www.lexus.com/models/RZ , https://insideevs.com/news/2026-lexus-rz-debut/",
  shortList: false,
  sources:
    "- Lexus 2026 RZ pressroom: https://pressroom.lexus.com/2026-lexus-rz-makes-world-debut/\n- InsideEVs: https://insideevs.com/news/2026-lexus-rz-debut/",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-rz",
} as const satisfies CarYear
