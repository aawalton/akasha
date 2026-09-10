import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const tightClothing = {
  id: "01a06594-c685-7006-8a78-5686d9bfcb71",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "tight-clothing",
  title: "Tight clothing",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
