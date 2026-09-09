import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const personaPersonalMeaning = {
  id: "01a06594-c67c-7001-9df0-66d87e959b3d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "persona-personal-meaning",
  title: "Persona personal meaning",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
