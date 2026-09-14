import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const emotionalArchaeology = {
  id: "01a06594-c678-7000-b9b3-7bed25eebb83",
  type: "book-section",
  slug: "emotional-archaeology",
  title: "Emotional Archaeology",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
