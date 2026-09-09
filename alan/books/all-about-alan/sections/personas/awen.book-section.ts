import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const awen = {
  id: "01a06594-c686-700e-9cff-83905d41179b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "awen",
  title: "Awen",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
