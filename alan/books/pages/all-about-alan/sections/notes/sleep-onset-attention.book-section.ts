import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const sleepOnsetAttention = {
  id: "01a06594-c684-7003-804a-53c17726c79c",
  type: "book-section",
  slug: "sleep-onset-attention",
  title: "Sleep-onset attention",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
