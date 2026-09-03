import type { CarYear } from "../car-year.page-type.ts"

export const lexusLx2025 = {
  id: "019e4aed-4293-72c6-b328-96e1dc3af8df",
  pageTypeSlug: "car-year",
  slug: "lexus-lx-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "LX 700h hybrid debuts for 2025 with twin-turbo V6 + electric motor producing 457 hp combined. Available in Overtrail, F SPORT Handling, Luxury, and Ultra Luxury trims. Source: https://pressroom.lexus.com/2025-lexus-lx-700h/",
  shortList: false,
  sources: "- 2025 Lexus LX 700h pressroom",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-lx",
} as const satisfies CarYear
