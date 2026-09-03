import type { CarYear } from "../car-year.page-type.ts"

export const volvoEx902026 = {
  id: "019e4afe-6aed-7404-9c46-e84e02f294d6",
  pageTypeSlug: "car-year",
  slug: "volvo-ex90-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major mid-cycle refresh. Switch from 400V to 800V electrical architecture, DC-fast charging peak jumps from ~250 kW to 350 kW (155 mi added in 10 min claimed). New core compute and updated ADAS / impaired-driver-detection software. New Single Motor Plus variant joins the lineup (~$76,695 MSRP, 92 kWh pack, 276–291 mi EPA). New Twin Motor Performance — 670 hp, the most powerful production Volvo ever. NACS port is now built in; no adapter required. Sources: https://www.volvocars.com/us/media/press-releases/A2ED18400A01D55B/, https://carbuzz.com/cars/volvo/ex90/2026/specs-and-trims/, https://www.edmunds.com/volvo/ex90/2026/",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/media/press-releases/A2ED18400A01D55B/\n- https://carbuzz.com/cars/volvo/ex90/2026/specs-and-trims/\n- https://www.edmunds.com/volvo/ex90/2026/",
  exclusionReason:
    "All trims excluded for kill switch (interior-sensing impairment-detection system)",
  carModelSlug: "volvo-ex90",
} as const satisfies CarYear
