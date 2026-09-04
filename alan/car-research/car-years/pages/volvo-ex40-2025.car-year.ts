import type { CarYear } from "../car-year.page-type.ts"

export const volvoEx402025 = {
  id: "019e4afe-1803-716b-95c5-cc1936529b39",
  pageTypeSlug: "car-year",
  slug: "volvo-ex40-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "First year under the new EX40 name (formerly XC40 Recharge). Core, Plus, and Ultra trims, each with Single Motor (RWD, 248 hp, ~296 mi) or Twin Motor (AWD, 402 hp, ~254 mi). MSRP $53,795–$60,295 including destination. Comes with NACS adapter for Tesla Supercharger access. Source: https://www.cars.com/research/volvo-ex40-2025/trims/",
  shortList: false,
  sources:
    "- https://www.cars.com/research/volvo-ex40-2025/trims/\n- https://www.kbb.com/volvo/ex40/2025/specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "volvo-ex40",
} as const satisfies CarYear
