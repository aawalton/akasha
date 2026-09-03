import type { CarYear } from "../car-year.page-type.ts"

export const cadillacCelestiq2026 = {
  id: "019e4ad8-6e9b-78c8-8b65-e91fff19cdbd",
  pageTypeSlug: "car-year",
  slug: "cadillac-celestiq-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Price increase: starting at low-$400,000 range (up >$60,000 from 2025). Same 111-kWh battery, 655 hp dual-motor AWD, 303-mile range. Cadillac streamlined the design/order process. Sources: [Autoblog 2026 Celestiq pricing](https://www.autoblog.com/news/2026-cadillac-celestiq-pricing-goes-up), [HotCars 2026 Celestiq](https://www.hotcars.com/2026-cadillac-celestiq-pricing/).",
  shortList: false,
  sources:
    "- [Autoblog 2026 Celestiq](https://www.autoblog.com/news/2026-cadillac-celestiq-pricing-goes-up)\n- [HotCars 2026 Celestiq pricing](https://www.hotcars.com/2026-cadillac-celestiq-pricing/)\n- [US News 2026 Celestiq](https://cars.usnews.com/cars-trucks/cadillac/celestiq)",
  exclusionReason: "All trims excluded",
  carModelSlug: "cadillac-celestiq",
} as const satisfies CarYear
