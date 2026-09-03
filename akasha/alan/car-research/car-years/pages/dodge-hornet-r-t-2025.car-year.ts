import type { CarYear } from "../car-year.page-type.ts"

export const dodgeHornetRT2025 = {
  id: "019e4ad9-d66f-747d-a213-549978c87df0",
  pageTypeSlug: "car-year",
  slug: "dodge-hornet-r-t-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Final model year for the Hornet R/T PHEV (and the Hornet nameplate overall) — Stellantis announced January 2026 that Hornet production has ended, with no MY2026, attributing the discontinuation to the 25% imported-vehicle tariff under the Trump administration and a 54% YoY sales decline (82% Q4). MY2025 trims: R/T (MSRP ~$41,645) and R/T Plus (~$46,990). Same 1.3L turbo I4 + 90 kW e-motor + 15.5 kWh battery as prior years; 33 mi EV range, 77 MPGe combined, 288 hp PowerShot peak. Sources: https://www.autoblog.com/news/dodge-officially-kills-hornet ; https://electrek.co/2026/01/16/jeep-dodge-owner-kills-off-another-vehicle-over-us-policy-changes/ ; https://www.dodge.com/2025/hornet/specs.rt.html",
  shortList: false,
  sources:
    "- https://www.dodge.com/2025/hornet/specs.rt.html\n- https://www.autoblog.com/news/dodge-officially-kills-hornet\n- https://electrek.co/2026/01/16/jeep-dodge-owner-kills-off-another-vehicle-over-us-policy-changes/\n- https://cars.usnews.com/cars-trucks/dodge/hornet-plug-in-hybrid\n- https://www.edmunds.com/dodge/hornet/2025/plug-in-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "dodge-hornet-r-t",
} as const satisfies CarYear
