import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const energyAccounting = {
  id: "01a06594-c679-7001-9f74-f60c64b33845",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "energy-accounting",
  title: "Energy accounting practice",
  sectionOf: "all-about-alan",
  description: "Energy-accounting practice — 10+ years of minute-level resource tracking.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
