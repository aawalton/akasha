import type { CarYear } from "../car-year.page-type.ts"

export const volvoEx402026 = {
  id: "019e4afe-2830-7bd5-8c01-1a1d39f58cfb",
  pageTypeSlug: "car-year",
  slug: "volvo-ex40-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 carries the EX40 forward with a built-in NACS port (no adapter needed for Tesla Supercharger DC-fast access on most trims) and ongoing OTA UX updates to the Volvo Car UX / Google Built-in stack. Trim structure unchanged (Core / Plus / Ultra × Single Motor / Twin Motor). Source: https://www.volvocars.com/us/cars/ex40-electric/",
  shortList: false,
  sources: "- https://www.volvocars.com/us/cars/ex40-electric/",
  exclusionReason: "All trims excluded",
  carModelSlug: "volvo-ex40",
} as const satisfies CarYear
