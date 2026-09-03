import type { CarYear } from "../car-year.page-type.ts"

export const jeepWrangler4xe2025 = {
  id: "019e4ae4-36b8-76f8-826a-a861c537cf66",
  pageTypeSlug: "car-year",
  slug: "jeep-wrangler-4xe-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Final Wrangler 4xe model year before the 2026 cancellation. Pricing held roughly flat to 2024; the High Altitude and Willys '41 special editions returned; Sport S 4xe became the new entry point in place of the prior base Sport. Hardware unchanged: 2.0L turbo + 17.3 kWh battery, 22 mi EPA electric range, 49 MPGe combined, 20 MPG gas-only. Lost federal $7,500 tax credit eligibility Jan 1 2025 due to stricter critical-minerals rules; Stellantis backfilled with a $7,500 manufacturer rebate beginning October 2025 and continuing through remaining MY2025 inventory. Sources: https://www.jeep.com/wrangler-4xe.html, https://www.carsdirect.com/automotive-news/2025-jeep-plug-in-hybrids-lose-tax-credit, https://electrek.co/2025/10/03/jeep-dodge-chrysler-vehicles-still-qualify-for-7500-ev-credit/",
  shortList: false,
  sources:
    "- https://www.jeep.com/wrangler-4xe.html\n- https://cars.usnews.com/cars-trucks/jeep/wrangler-4xe/specs\n- https://www.edmunds.com/jeep/wrangler-4xe/2025/mpg/\n- https://www.kbb.com/jeep/wrangler-4xe/2025/rubicon-4xe/",
  exclusionReason: "All trims excluded",
  carModelSlug: "jeep-wrangler-4xe",
} as const satisfies CarYear
