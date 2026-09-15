import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const personaPersonalMeaning = {
  id: "01a06594-c67c-7001-9df0-66d87e959b3d",
  type: "page-type/book-section",
  slug: "persona-personal-meaning",
  title: "Persona personal meaning",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
