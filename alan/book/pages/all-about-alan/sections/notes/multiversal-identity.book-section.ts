import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const multiversalIdentity = {
  id: "01a06594-c67b-700a-ad4a-da78a4616ee3",
  type: "page-type/book-section",
  slug: "multiversal-identity",
  title: "Multiversal identity",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
