import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqsSuv2026 = {
  id: "019e4af1-f5f1-7071-af38-fcac320c8d92",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqs-suv-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 includes exterior refresh aligning with the EQS Sedan front-end update, native support for NACS DC fast-charging via included adapter, software refinements, and trim repackaging. Sources: https://www.truecar.com/overview/mercedes-benz/eqs-suv/ ; https://www.mbusa.com/en/vehicles/class/eqs/suv",
  shortList: false,
  sources:
    "- https://www.truecar.com/overview/mercedes-benz/eqs-suv/\n- https://www.mbusa.com/en/vehicles/class/eqs/suv",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqs-suv",
} as const satisfies CarYear
