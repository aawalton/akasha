import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const llmSimilarity = {
  id: "01a06594-c67a-7019-868c-cb32cdba5300",
  type: "book-section",
  slug: "llm-similarity",
  title: "LLM-similarity",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
