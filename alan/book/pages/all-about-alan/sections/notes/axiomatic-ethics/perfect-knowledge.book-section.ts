import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const perfectKnowledge = {
  id: "01a06594-c675-700c-8f65-e84ae26f210e",
  type: "page-type/book-section",
  slug: "perfect-knowledge",
  title: "Perfect knowledge — the two oracles, the tick, and scale-freedom",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/axiomatic-ethics"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
