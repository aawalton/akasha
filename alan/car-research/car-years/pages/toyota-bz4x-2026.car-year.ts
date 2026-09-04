import type { CarYear } from "../car-year.page-type.ts"

export const toyotaBz4x2026 = {
  id: "019e4afa-a400-7801-9016-6e24ea26592c",
  pageTypeSlug: "car-year",
  slug: "toyota-bz4x-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major refresh: renamed to 'bZ' (no longer bZ4X). Updated styling, new NACS charging port (native, no adapter), increased battery capacity (~74.7 kWh gross / ~67.7 kWh usable estimated), peak DC fast charge increased to ~150 kW with battery preconditioning added, AWD output increased to 338 hp (XLE Premium AWD), improved cold-weather charging performance. Plug-and-Charge support added for compatible networks. New larger touchscreen and updated UI. EPA range estimates: ~314 mi (FWD long-range), ~278 mi (AWD), per Toyota preliminary. Pricing TBD but expected to start around $36,000-$38,000. Sources: https://pressroom.toyota.com/2026-toyota-bz-pricing/ ; https://insideevs.com/news/735069/toyota-bz4x-2026-refresh/ ; https://www.toyota.com/bz/",
  shortList: true,
  sources:
    "- https://www.toyota.com/bz/\n- https://pressroom.toyota.com/2026-toyota-bz/\n- https://insideevs.com/news/735069/toyota-bz4x-2026-refresh/\n- https://electrek.co/2025/03/19/toyota-bz-2026-electric-suv-debut/",
  carModelSlug: "toyota-bz4x",
} as const satisfies CarYear
