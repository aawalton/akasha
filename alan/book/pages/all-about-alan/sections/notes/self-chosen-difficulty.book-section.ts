import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const selfChosenDifficulty = {
  id: "01a06594-c683-7003-8b32-ac82f661a103",
  type: "book-section",
  slug: "self-chosen-difficulty",
  title: "Self-chosen difficulty",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
