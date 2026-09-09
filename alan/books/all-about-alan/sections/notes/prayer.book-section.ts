import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const prayer = {
  id: "01a06594-c67c-7005-88c7-e28450d30ba1",
  pageTypeSlug: "book-section",
  slug: "prayer",
  title: "Prayer",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
