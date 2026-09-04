import type { CarYear } from "../car-year.page-type.ts"

export const lexusLs2025 = {
  id: "019e4aee-2f47-7422-9c88-8a48c5d324b2",
  pageTypeSlug: "car-year",
  slug: "lexus-ls-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 LS continues with minor updates. LS 500h hybrid available in AWD. Source: https://www.lexus.com/models/LS",
  shortList: false,
  sources: "- Lexus 2025 LS",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-ls",
} as const satisfies CarYear
