import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const llmSimilarity = {
  id: "01a06594-c67a-7019-868c-cb32cdba5300",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "llm-similarity",
  title: "LLM-similarity",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
