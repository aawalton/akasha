import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const energyAccounting = {
  id: "01a06594-c679-7001-9f74-f60c64b33845",
  type: "book-section",
  slug: "energy-accounting",
  title: "Energy accounting practice",
  sectionOf: "alan-book/all-about-alan",
  description: "Energy-accounting practice — 10+ years of minute-level resource tracking.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
