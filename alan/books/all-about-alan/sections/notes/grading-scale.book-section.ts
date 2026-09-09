import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const gradingScale = {
  id: "01a06594-c67a-7002-8289-094f32f578cf",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "grading-scale",
  title: "Grading scale",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
