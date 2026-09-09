import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const safety = {
  id: "01a06594-c682-7002-9ce1-f8926835c02b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "safety",
  title: "Safety",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
