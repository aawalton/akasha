import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqsSedan2026 = {
  id: "019e4af1-d758-74c8-827c-2463d568c9a2",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqs-sedan-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 includes a comprehensive refresh: revised exterior with star-pattern grille standard, refreshed interior trim, range improvements (EQS 450+ rated up to 390 mi per Mercedes preliminary spec), inclusion of the NACS-to-CCS1 adapter for Tesla Supercharger access, and updated MBUX software. AMG EQS 53 trim continues. Sources: https://www.mbusa.com/en/vehicles/class/eqs/sedan ; https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/eqs/sedan\n- https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqs-sedan",
} as const satisfies CarYear
