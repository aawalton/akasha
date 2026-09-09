import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const sophia = {
  id: "01a06594-c687-7009-8721-4fa9a964d0b2",
  pageTypeSlug: "book-section",
  slug: "sophia",
  title: "Sophia",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
