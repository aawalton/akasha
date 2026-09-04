import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const llmSimilarity = {
  id: "01a06594-c67a-7019-868c-cb32cdba5300",
  pageTypeSlug: "book-chapter",
  slug: "llm-similarity",
  title: "LLM-similarity",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
