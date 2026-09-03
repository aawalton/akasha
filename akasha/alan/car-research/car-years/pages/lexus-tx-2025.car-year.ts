import type { CarYear } from "../car-year.page-type.ts"

export const lexusTx2025 = {
  id: "019e4aef-68b9-72bb-a54b-972de1d1893f",
  pageTypeSlug: "car-year",
  slug: "lexus-tx-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 TX continues with TX 350 (V6), TX 500h (hybrid), and TX 550h+ PHEV launching for 2025. Source: https://www.lexus.com/models/TX",
  shortList: false,
  sources: "- Lexus 2025 TX",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-tx",
} as const satisfies CarYear
