import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiTucsonPlugInHybrid2026 = {
  id: "019e4ae3-63f5-77b2-a3fe-1e5c8c84cbed",
  pageTypeSlug: "car-year",
  slug: "hyundai-tucson-plug-in-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Price increase across both trims: SEL $41,925 (up $2,195) and Limited $50,150 (up $2,710) reflecting expiration of $7,500 PHEV tax credit. Carryover spec otherwise. Sources: https://www.hyundaiusa.com/us/en/vehicles/tucson-plug-in-hybrid ; https://www.kbb.com/hyundai/tucson-plug-in-hybrid/",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/tucson-plug-in-hybrid\n- https://www.kbb.com/hyundai/tucson-plug-in-hybrid/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-tucson-plug-in-hybrid",
} as const satisfies CarYear
