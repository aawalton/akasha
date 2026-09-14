import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const presentTenseModel = {
  id: "01a06594-c67c-7006-a146-7d12fa444c1a",
  type: "book-section",
  slug: "present-tense-model",
  title: "Present-tense conceptual model",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
