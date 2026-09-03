import type { CarYear } from "../car-year.page-type.ts"

export const lexusRx2025 = {
  id: "019e4ae9-b8c9-7bd7-9d5a-84adfe03d6ac",
  pageTypeSlug: "car-year",
  slug: "lexus-rx-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 RX adds RX 450h+ PHEV to the US lineup for the first time. RX 500h F SPORT Performance continues with 366 hp hybrid system. RX 350h base hybrid retained. Source: https://pressroom.lexus.com/2025-lexus-rx/",
  shortList: false,
  sources: "- Lexus 2025 RX pressroom\n- EPA",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-rx",
} as const satisfies CarYear
