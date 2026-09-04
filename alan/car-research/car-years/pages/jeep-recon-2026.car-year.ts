import type { CarYear } from "../car-year.page-type.ts"

export const jeepRecon2026 = {
  id: "019e4ae8-4931-7548-80a8-97fc61909526",
  pageTypeSlug: "car-year",
  slug: "jeep-recon-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Inaugural model year for the Recon EV. After multiple production delays, launches mid-2026 as a single Moab Edition trim at $65,000 (before $1,995 destination, $66,995 OTD). 100 kWh battery, ~230 mi range, 650 hp dual-motor AWD, NACS port from launch (one of the first Jeep EVs to ship with native NACS rather than CCS1+adapter). Stellantis has not announced 2027 trims beyond Moab. Sources: https://www.jeep.com/recon.html, https://carbuzz.com/2026-jeep-recon-specs-pricing/, https://expeditionportal.com/jeep-recon-ev-production-delayed-to-mid-2026/",
  shortList: false,
  sources:
    "- https://www.jeep.com/recon.html\n- https://www.edmunds.com/jeep/recon/2026/features-specs/\n- https://carbuzz.com/2026-jeep-recon-specs-pricing/",
  exclusionReason: "All trims excluded",
  carModelSlug: "jeep-recon",
} as const satisfies CarYear
