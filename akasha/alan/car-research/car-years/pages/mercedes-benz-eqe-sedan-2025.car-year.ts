import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqeSedan2025 = {
  id: "019e4af2-136e-7478-a2c3-1e2a603a5c9c",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqe-sedan-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added grille refresh similar to EQS, packaging changes, expanded standard features, and range improvements. EQE 350+ rated at 308 mi EPA. Sources: https://cars.usnews.com/cars-trucks/mercedes-benz/eqe-sedan ; https://www.edmunds.com/mercedes-benz/eqe/",
  shortList: false,
  sources:
    "- https://cars.usnews.com/cars-trucks/mercedes-benz/eqe-sedan\n- https://www.edmunds.com/mercedes-benz/eqe/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqe-sedan",
} as const satisfies CarYear
