import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const ali = {
  id: "01a06594-c686-7009-9a69-2df478fe3a57",
  type: "page-type/book-section",
  slug: "ali",
  title: "Ali",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
