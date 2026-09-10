import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const sexWithJen = {
  id: "01a06594-c683-7011-8e49-5f523380a909",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sex-with-jen",
  title: "Sex with Jen",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
