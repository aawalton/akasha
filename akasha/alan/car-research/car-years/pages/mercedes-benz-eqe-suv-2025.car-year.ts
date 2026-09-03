import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqeSuv2025 = {
  id: "019e4af2-2c33-7852-b559-4506e1272615",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqe-suv-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 EQE SUV adds standard 360-degree camera and 5th seat package refinements. Trims: EQE 350+, EQE 350 4MATIC, EQE 500 4MATIC, AMG EQE. Source: https://www.edmunds.com/mercedes-benz/eqe-suv/2025/",
  shortList: false,
  sources:
    "- https://www.edmunds.com/mercedes-benz/eqe-suv/2025/\n- https://carbuzz.com/cars/mercedes-benz/eqe-suv/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqe-suv",
} as const satisfies CarYear
