import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const aine = {
  id: "01a06594-c686-7008-b2fa-f1c8365475ad",
  type: "book-section",
  slug: "aine",
  title: "Aine",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
