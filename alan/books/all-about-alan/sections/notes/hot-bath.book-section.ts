import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const hotBath = {
  id: "01a06594-c67a-7008-8105-2d39c17be4a1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "hot-bath",
  title: "Hot bath",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
