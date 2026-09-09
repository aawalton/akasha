import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const alexithymia = {
  id: "01a06594-c674-7009-ad7b-360c43244013",
  pageTypeSlug: "book-section",
  slug: "alexithymia",
  title: "Alexithymia",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
