import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqb2025 = {
  id: "019e4af2-9cbb-7527-a762-1bd7a2f5c754",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqb-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 is the final year for EQB in the US. Mercedes confirmed end-of-production after MY2025 with no MY2026 model. Trims: EQB 250+ (FWD), EQB 300 4MATIC, EQB 350 4MATIC. Standard 3-row 7-passenger seating. Sources: https://www.mbusa.com/en/vehicles/class/eqb/suv ; https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/eqb/suv\n- https://carbuzz.com/mercedes-benz-ev-models-you-can-buy-in-2026/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqb",
} as const satisfies CarYear
