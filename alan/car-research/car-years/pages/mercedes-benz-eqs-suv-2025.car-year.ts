import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqsSuv2025 = {
  id: "019e4af1-f4c0-7bc1-94cb-9db1c473c9b8",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqs-suv-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added standard 360-degree camera, expanded MBUX features, optional 5th seat package, and a Pinnacle trim repackage. Trim levels: Premium, Exclusive, Pinnacle. Sources: https://www.mbusa.com/en/vehicles/class/eqs/suv ; https://www.kbb.com/mercedes-benz/mercedes-eq-eqs-suv/",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/eqs/suv\n- https://www.kbb.com/mercedes-benz/mercedes-eq-eqs-suv/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqs-suv",
} as const satisfies CarYear
