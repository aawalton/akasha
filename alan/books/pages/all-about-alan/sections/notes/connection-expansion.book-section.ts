import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const connectionExpansion = {
  id: "01a06594-c677-7003-a5f5-e802dc32f635",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "connection-expansion",
  title: "Connection expansion",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
