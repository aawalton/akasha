import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const responsibilityMode = {
  id: "01a06594-c67c-7010-9dde-28ffbedb9700",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "responsibility-mode",
  title: "Responsibility Mode",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
