import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiIoniq5N2026 = {
  id: "019e4ae2-aded-75e0-a80e-0a7373742639",
  pageTypeSlug: "car-year",
  slug: "hyundai-ioniq-5-n-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major change: CCS1 port replaced by native NACS (Tesla-style) port for direct Supercharger access without an adapter. Now integrated as the N trim within the standard 2026 Ioniq 5 lineup rather than a separate model year designation. Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-5",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5\n- https://cars.usnews.com/cars-trucks/hyundai/ioniq-5",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-ioniq-5-n",
} as const satisfies CarYear
