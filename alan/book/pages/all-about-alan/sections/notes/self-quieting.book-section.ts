import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const selfQuieting = {
  id: "01a06594-c683-7008-8bd2-33b06d9a3284",
  type: "page-type/book-section",
  slug: "self-quieting",
  title: "Self-quieting",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
