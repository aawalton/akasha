import type { CarYear } from "../car-year.page-type.ts"

export const toyotaPriusPrime2025 = {
  id: "019e4afe-c158-7377-b4cd-1085fc23748c",
  pageTypeSlug: "car-year",
  slug: "toyota-prius-prime-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added Solar Roof option on XSE Premium (cabin trickle-charge), minor option re-packaging. Powertrain unchanged from MY2024. Standard equipment levels improved. Source: https://pressroom.toyota.com/2025-toyota-prius-prime/",
  shortList: false,
  sources:
    "- https://www.toyota.com/priusprime/2025/\n- https://pressroom.toyota.com/2025-toyota-prius-prime/",
  exclusionReason: "All trims excluded",
  carModelSlug: "toyota-prius-prime",
} as const satisfies CarYear
