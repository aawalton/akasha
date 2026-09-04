import type { CarYear } from "../car-year.page-type.ts"

export const mclarenW12026 = {
  id: "019e4aec-c93c-7cc9-99fc-b1918dd2de49",
  pageTypeSlug: "car-year",
  slug: "mclaren-w1-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "First production model year for the W1. Production commenced in 2025; first US deliveries begin 2026. Capped at 399 units globally with allocation already complete. No prior-year reference — this is the inaugural year. Successor to the McLaren P1 (2013-2015). Source: https://en.wikipedia.org/wiki/McLaren_W1 ; https://cars.mclaren.com/us_en/W1",
  shortList: false,
  sources:
    "- https://cars.mclaren.com/us_en/W1\n- https://en.wikipedia.org/wiki/McLaren_W1\n- https://www.mclarenhouston.com/2026-mclaren-w1",
  exclusionReason: "All trims excluded",
  carModelSlug: "mclaren-w1",
} as const satisfies CarYear
