import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const ali = {
  id: "01a06594-c686-7009-9a69-2df478fe3a57",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "ali",
  title: "Ali",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
