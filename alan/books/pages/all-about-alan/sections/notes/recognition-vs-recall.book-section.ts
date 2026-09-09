import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const recognitionVsRecall = {
  id: "01a06594-c67c-700a-a09f-3f2fba75a379",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "recognition-vs-recall",
  title: "Recognition vs. Recall",
  sectionOf: "all-about-alan",
  description:
    "Recognition vs. recall — distinction that refines the aphantasia mechanism (recognition intact, recall broken).",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
