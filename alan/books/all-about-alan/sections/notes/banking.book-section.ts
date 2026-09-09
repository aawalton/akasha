import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const banking = {
  id: "01a06594-c675-7010-8b3d-8b6c651c11da",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "banking",
  title: "Banking",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
