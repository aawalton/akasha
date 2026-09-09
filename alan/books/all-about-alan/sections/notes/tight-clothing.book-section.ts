import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const tightClothing = {
  id: "01a06594-c685-7006-8a78-5686d9bfcb71",
  pageTypeSlug: "book-section",
  slug: "tight-clothing",
  title: "Tight clothing",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
