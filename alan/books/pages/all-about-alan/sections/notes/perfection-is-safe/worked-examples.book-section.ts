import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const workedExamples = {
  id: "01a06594-c67b-7016-bdaf-16bdfe0b59e2",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "worked-examples",
  title: "The worked-examples wall",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
