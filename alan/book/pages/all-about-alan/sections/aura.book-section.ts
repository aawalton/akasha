import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const aura = {
  id: "01a06594-c686-700d-90ca-81bde6d056c5",
  type: "page-type/book-section",
  slug: "aura",
  title: "Aura",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
