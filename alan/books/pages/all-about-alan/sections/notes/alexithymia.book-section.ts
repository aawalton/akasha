import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const alexithymia = {
  id: "01a06594-c674-7009-ad7b-360c43244013",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "alexithymia",
  title: "Alexithymia",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
